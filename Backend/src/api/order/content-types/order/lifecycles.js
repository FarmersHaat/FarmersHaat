module.exports = {
  async afterUpdate(event) {
    const { result } = event;
        await strapi.plugins["email"].services.email.send({
            to: result.email,
            from: "care@farmershaat.com",
            replyTo: "care@farmershaat.com",
            templateId: process.env.TEMPLATE_ID_TRACKINGID,
            dynamicTemplateData: {
                order_ID: result.orderId,
                userData: {
                    firstname: result.firstname,
                },
                amount: `₹ ${result.amount}`,
                products: result.products,
                trackingId: result.trackingId,
            },
        });
  },
};
