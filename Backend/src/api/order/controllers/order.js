"use strict";
const Razorpay = require("razorpay");
const crypto = require('crypto-js')

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
    const { products } = ctx.request.body;
        
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
        
    console.log("Checkpoint-1")
    try {
        const lineItems = await Promise.all(
            products.map(async (product) => {
                const item = await strapi
                    .service("api::product.product")
                    .findOne(product.id);
                return {
                    name: item.title,
                    currency: "INR",
                    amount: Math.round(item.discountedPrice * 100),
                    quantity: product.attributes.quantity,
                };
            })
        );
        const options = {
            amount: lineItems.reduce((acc, item) => acc + item.amount * item.quantity, 0),
            currency: "INR",
            receipt: "order_" + Date.now(),
            payment_capture: 1,
            line_items: lineItems,
        };
        
        const order = await razorpay.orders.create(options);
        
        ctx.response.status = 200;
        return { data: order };
    }
    catch (error) {
        ctx.response.status = 500;
        return { error };
        }
    },
    
    async verify(ctx) {
        console.log("Checkpoint-2")
        const { paymentData, userData, productData } = ctx.request.body;
        const generateSign = crypto.HmacSHA256(
            paymentData.razorpay_order_id + '|' + paymentData.razorpay_payment_id,
            process.env.RAZORPAY_KEY_SECRET
        ).toString();
        if (generateSign === paymentData.razorpay_signature) {
            console.log("Checkpoint-3")

            await strapi
                .service("api::order.order")
                .create({
                    data: {
                        products: productData,
                        paymentID: paymentData.razorpay_payment_id,
                        email: userData.email,
                        phone: userData.contact,
                        firstname: userData.firstname,
                        lastname: userData.lastname,
                        address: userData.address,
                        zipcode: userData.zipcode,
                        city: userData.city,
                        state: userData.state
                    }
                }).then(() => {
                    console.log("Checkpoint-4")
                    ctx.response.status = 200
                    ctx.send("Order confirmed");
                }
                ).catch(error => {
                    console.log(error);
                    ctx.response.status = 500;
                    ctx.send("Order Declined");
                });
            
            try {
                await strapi.plugins['email'].services.email.send({
                    to: userData.email,
                    from: 'care@farmershaat.com',
                    replyTo: 'care@farmershaat.com',
                    subject: `Hello ${userData.firstname}, we've recieved your order!.`,
                    text: `Dear ${userData.firstname},\nThank yout for shopping from Farmers Haat\nYour order has been confirmed and will be deliverd shortly.\nOrder Id : ${paymentData.razorpay_order_id}\nWith Regard,\nFarmers Haat,\nwww.farmershaat.com`
                })
                ctx.send("Email Sent!");
            }
            catch (error) {
                ctx.response.status = 500;
                return { error };
            }
        }
    }
}));