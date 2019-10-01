module.exports = {
    transpileDependencies: ['vuex-persist'],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://35.194.166.192:8081',
                //target: 'http://localhost:8081',
                changOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
};