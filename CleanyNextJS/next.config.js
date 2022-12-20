// next.config.js
module.exports = {
    images: {
          domains: ['assets.maccarianagency.com'],
    },
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        }
        return config
    },

}