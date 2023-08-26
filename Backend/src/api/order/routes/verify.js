module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/order/verify',
            handler: 'order.verify',
            config: {
                policies: [], // Remove any existing policies
                auth: false, // Make the action public
            }
        }
    ]
};