module.exports = {
    transpileDependencies: ['vuex-persist'],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://104.155.212.215:8081',
                //target: 'http://localhost:8081',
                changOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
};