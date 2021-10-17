console.log("backsync called")
workbox.routing.registerRoute(
    'http:\/\/localhost:8000\/api\/articles',
    new workbox.strategies.NetworkOnly({
        plugins: [
            new workbox.backgroundSync.Plugin('myQueueName', {
                maxRetentionTime: 24 * 60
            })
        ]
    }),
    'POST'
);