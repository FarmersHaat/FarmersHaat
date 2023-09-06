module.exports = {
  async afterUpdate(event) {
        const { result } = event;
        const products = result.products.map((val) => {
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
                products: products,
                trackingId: result.trackingId,
            },
        });
  },
};
