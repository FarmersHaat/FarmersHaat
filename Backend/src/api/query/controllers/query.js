'use strict';

/**
 * query controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::query.query", ({ strapi }) => ({
    async sendEmail(ctx) {
        console.log("Checkpoint-1")
        const {details} = ctx.request.body;

        console.log(details)
        
        try {
            await strapi.plugins['email'].services.email.send({
                to: details.email,
                from: 'care@farmershaat.com',
                replyTo: 'care@farmershaat.com',
                subject: `Hello ${details.name}, thanks you submitting your query.`,
                text: `Dear ${details.name},\n${details.query}\nWith Regard,\nFarmers Haat,\nwww.farmershaat.com`
            })
            ctx.send("Email Sent!");
        }
        catch (error) {
            ctx.response.status = 500;
            return { error };
        }
        await strapi
            .service("api::query.query")
            .create({
                data: {
                    name: details.name,
                    email: details.email,
                    query: details.query
                }
            }).then(() =>{
                ctx.response.status = 200
                return "Successful";
            }
            ).catch(error => {
                console.log(error);
                ctx.response.status = 500;
                return "Unsuccessful";
            })
        // return "Unverified Payment";
        
        ctx.response.status = 200;
        return details;
    }
}));
