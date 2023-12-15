// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// });


module.exports = {
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api/v1': {
        target: 'https://api01.hmi.com.ph/',
        ws: true,
        changeOrigin: true,
        https: true,
        hotOnly: false,
        disableHostCheck: true,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      },
    },
  },
};