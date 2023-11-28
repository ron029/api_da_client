// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })


module.exports = {
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/onlc': {
        target: 'http://localhost:8888',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};