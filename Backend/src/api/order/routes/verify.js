module.exports = {
    routes: [
    {
        method: 'POST',
        path: '/order/verify',
        handler: 'order.verify'
    },
    {
        method: 'POST',
        path: '/order/create',
        handler: 'order.create'
    }]
}