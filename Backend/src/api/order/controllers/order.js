"use strict";
const crypto = require("crypto-js");
const ReqMsgDTO = require("../../../worldlineConfig/ReqMsgDTO.js");
const ResMsgDTO = require("../../../worldlineConfig/ResMsgDTO.js");
let reqMsgDTO = new ReqMsgDTO();
let resMsgDTO = new ResMsgDTO();
var AWLMEAPI = require("../../../worldlineConfig/AWLMEAPI.js");
var transactMeAPI = new AWLMEAPI();

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userData } = ctx.request.body;
    // console.log(JSON.stringify(products));
    // console.log(userData);

    // Get all the product data :
    const lineItems = await Promise.all(
      products.map(async (product) => {
        const item = await strapi
          .service("api::product.product")
          .findOne(product.id);
        return {
          if(product.attributes.discount!==0){
          name: item.title,
          currency: "INR",
          amount:
            Math.round(
              (1 - product.attributes.discount / 100) *
                product.attributes.price *
                1.05
            ) * 100,
            
          quantity: product.attributes.quantity,
          }else {
          name: item.title,
          currency: "INR",
          amount:product.attributes.discountedPrice,
          quantity: product.attributes.quantity,
            }
        };
      })
    );

    const options = {
      amount: lineItems.reduce(
        (acc, item) => acc + item.amount * item.quantity,
        0
      ),
      currency: "INR",
      receipt: "order_" + Date.now(),
    };
    const mid = process.env.MERCHANT_ID;
    const encKey = process.env.ENCRYPTION_KEY;
    const orderId = options.receipt;
    const amt = options.amount;
    const ResponseUrl = process.env.RESPONSE_URL;

    reqMsgDTO.setMid(mid);
    reqMsgDTO.setEnckey(encKey);
    reqMsgDTO.setOrderId(orderId);
    reqMsgDTO.setTrnAmt(amt);
    reqMsgDTO.setTrnCurrency(options.currency);
    reqMsgDTO.setTrnRemarks("Live Mode");
    reqMsgDTO.setMeTransReqType("S");
    reqMsgDTO.setResponseUrl(ResponseUrl);

    var merchantRequest = null;
    try {
      reqMsgDTO = transactMeAPI.generateTrnReqMsg(reqMsgDTO);
      if (reqMsgDTO.getStatusDesc() == "Success") {
        merchantRequest = reqMsgDTO.getReqMsg();
        // console.log("ReqMsgDTO--------------------------------------------------");
        // console.log(reqMsgDTO);
        const txn_url = process.env.PAYMENT_URL;
        await strapi.service("api::order.order").create({
          data: {
            products: products,
            orderId: orderId,
            email: userData.email,
            phone: userData.contact,
            firstname: userData.firstname,
            lastname: userData.lastname,
            address: userData.address,
            zipcode: userData.zipcode,
            city: userData.city,
            state: userData.state,
            paid: false,
            status: "Not confirmed",
            transactionId: "",
            amount: amt / 100,
          },
        });
        return { txn_url, merchantRequest, MID: mid };
      }
    } catch (ex) {
      reqMsgDTO.setStatusDesc("Error Occurred during processing" + ex);
      console.log(ex);
    }
    // Paying using razorpay

    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    // try {
    //   const lineItems = await Promise.all(
    //     products.map(async (product) => {
    //       const item = await strapi
    //         .service("api::product.product")
    //         .findOne(product.id);
    //       return {
    //         name: item.title,
    //         currency: "INR",
    //         amount: Math.round(item.discountedPrice * 100),
    //         quantity: product.attributes.quantity,
    //       };
    //     })
    //   );

    //   const options = {
    //     amount: lineItems.reduce(
    //       (acc, item) => acc + item.amount * item.quantity,
    //       0
    //     ),
    //     currency: "INR",
    //     receipt: "order_" + Date.now(),
    //     payment_capture: 1,
    //     line_items: lineItems,
    //   };

    //   const order = await razorpay.orders.create(options);

    //   ctx.response.status = 200;
    //   return { data: order };
    // } catch (error) {
    //   console.log(error);
    //   ctx.response.status = 500;
    //   return { error };
    // }
  },
  async verify(ctx) {
    const { mid, merchantResponse } = ctx.request.body;
    const encKey = process.env.ENCRYPTION_KEY;
    var transactMeAPI = new AWLMEAPI();
    resMsgDTO = await transactMeAPI.parseTrnResMsg(merchantResponse, encKey);
    // console.log(merchantResponse);
    // console.log(mid);

    if (resMsgDTO.getStatusCode() == "S") {
      console.log("Sucess");
      try {
        await strapi.db.query("api::order.order").update({
          where: { orderId: resMsgDTO.getOrderId() },
          data: {
            status: "Confirmed",
            paid: true,
            transactionId: resMsgDTO.pgMeTrnRefNo,
          },
        });
        const user = await strapi.db
          .query("api::order.order")
          .findOne({ where: { orderId: resMsgDTO.getOrderId() } });

        const products = user.products.map((val) => {
          //   console.log(val);
          return {
            id: val.id,
            title: val.attributes.title,
            imgUrl: val.attributes.imgUrl,
            discount: val.attributes.discount,
            quantity: `X ${val.attributes.quantity}`,
            totalAmount: `₹ ${
              val.attributes.price *
              (1 - 0.01 * val.attributes.discount) *
              val.attributes.quantity
            }`,
          };
        });
        await strapi.plugins["email"].services.email.send({
          to: user.email,
          from: "care@farmershaat.com",
          replyTo: "care@farmershaat.com",
          templateId: process.env.TEMPLATE_ID,
          dynamicTemplateData: {
            order_ID: user.orderId,
            userData: {
              firstname: user.firstname,
            },
            amount: `₹ ${user.amount}`,
            products: products,
          },
        });
        await strapi.plugins["email"].services.email.send({
          to: "care@farmershaat.com",
          from: "care@farmershaat.com",
          replyTo: "care@farmershaat.com",
          templateId: process.env.TEMPLATE_ID_RECEIVED,
          dynamicTemplateData: {
            order_ID: user.orderId,
            userData: {
              firstname: user.firstname,
              phone: user.contact,
              email: user.email,
              address: user.address,
              state: user.state,
              city: user.city,
              zipcode: user.zipcode,
            },
            amount: `₹ ${user.amount}`,
            products: products,
          },
        });
        // console.log(user.products);
        // console.log(products);
        ctx.response.redirect(process.env.REDIRECT_URL + "/payment/verified");
        return;
      } catch (error) {
        ctx.response.status = 500;
        return { error };
      }
      return;
    }
    //Success
    else {
      // console.log("ReqMsgDTO--------------------------------------------------");
      // console.log(resMsgDTO);
      ctx.response.redirect(process.env.REDIRECT_URL + "/payment/unverified");
      console.log("Failed");
    }
    //Failed

    // const { paymentData, userData, productData } = ctx.request.body;
    // const generateSign = crypto
    //   .HmacSHA256(
    //     paymentData.razorpay_order_id + "|" + paymentData.razorpay_payment_id,
    //     process.env.RAZORPAY_KEY_SECRET
    //   )
    //   .toString();
    // if (generateSign === paymentData.razorpay_signature) {
    //   console.log("Checkpoint-3");

    //   await strapi
    //     .service("api::order.order")
    //     .create({
    //       data: {
    //         products: productData,
    //         paymentID: paymentData.razorpay_payment_id,
    //         email: userData.email,
    //         phone: userData.contact,
    //         firstname: userData.firstname,
    //         lastname: userData.lastname,
    //         address: userData.address,
    //         zipcode: userData.zipcode,
    //         city: userData.city,
    //         state: userData.state,
    //       },
    //     })
    //     .then(() => {
    //       console.log("Checkpoint-4");
    //       ctx.response.status = 200;
    //       ctx.send("Order confirmed");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       ctx.response.status = 500;
    //       ctx.send("Order Declined");
    //     });

    //   try {
    //     await strapi.plugins["email"].services.email.send({
    //       to: userData.email,
    //       from: "care@farmershaat.com",
    //       replyTo: "care@farmershaat.com",
    //       subject: `Hello ${userData.firstname}, we've recieved your order!.`,
    //       text: `Dear ${userData.firstname},\nThank yout for shopping from Farmers Haat\nYour order has been confirmed and will be deliverd shortly.\nOrder Id : ${paymentData.razorpay_order_id}\nWith Regard,\nFarmers Haat,\nwww.farmershaat.com`,
    //     });
    //     ctx.send("Email Sent!");
    //   } catch (error) {
    //     ctx.response.status = 500;
    //     return { error };
    //   }
    // }
    // ctx.response.redirect("http://localhost:3000/");
    return { h: "happy" };
  },
  async update(ctx) {
    console.log("Updated");
  }
}));
