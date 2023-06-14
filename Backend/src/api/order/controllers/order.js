"use strict";
const Razorpay = require("razorpay");

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
    const { products } = ctx.request.body;

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log(razorpay);
    try {
        const lineItems = await Promise.all(
            products.map(async (product) => {
                const item = await strapi
                    .service("api::product.product")
                    .findOne(product.id);
                return {
                    name: item.title,
                    currency: "INR",
                    amount: Math.round(item.price * 100),
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
        await strapi
            .service("api::order.order")
            .create({
                data: {
                    products,
                    paymentID: order.id,
                    email: order.email,
                    phone: order.contact
                }
            });
        ctx.response.status = 200;
        return { data: order };
    }
    catch (error) {
        ctx.response.status = 500;
        return { error };
    }},
}));