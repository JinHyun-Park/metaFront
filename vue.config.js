module.exports = {
  transpileDependencies: ['vuex-persist'],

  devServer: {
    proxy: {
      '/api': {
        // target: 'http://35.194.166.192:8081',
        target: process.env.VUE_APP_BASE_URL,
        changOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  css: {
    sourceMap: true,
  },
  indexPath: 'naru.html',
};
