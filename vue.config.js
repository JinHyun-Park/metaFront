module.exports = {
  transpileDependencies: ['vuex-persist'],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
