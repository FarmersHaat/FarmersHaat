module.exports = {
  async afterUpdate(event) {
    const { result } = event;
    if (
      result.trackingId === "" ||
      result.trackingId === null ||
      result.trackingId === undefined
    ) {
      console.log("Executed");
      return;
    }
    const products = result.products.map((val) => {
      //   console.log(val);
      return {
        id: val.id,
        title: val.attributes.title,
        imgUrl: val.attributes.imgUrl,
        discount: val.attributes.discount,
        quantity: `X ${val.attributes.quantity}`,
        totalAmount: `₹ ${

          {val.attributes.discount!==0?
             val.attributes.price *
          (1 - 0.01 * val.attributes.discount) *
          val.attributes.quantity

          :
           val.attributes.discountedPrice * val.attributes.quantity
        }
          
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
