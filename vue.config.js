// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// });


// module.exports = {
//   transpileDependencies: true,
//   devServer: {
//     proxy: {
//       '/api03/da': {
//         target: 'https://api01.hmi.com.ph/',
//         ws: true,
//         changeOrigin: true,
//         https: true,
//         hotOnly: false,
//         disableHostCheck: true,
//         headers: {
//           'Access-Control-Allow-Origin': '*'
//         }
//       },
//     },
//   },
// };

module.exports = {
  devServer: {
    proxy: {
      '/api03/da': {
        target: 'https://api01.hmi.com.ph',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/api03/da': '', // Remove /api03/da from the request path
        },
        onError: (err, req, res) => {
          console.error('Proxy Error:', err);
          res.writeHead(502, {
            'Content-Type': 'text/plain',
          });
          res.end('Bad Gateway asdf');
        },
      },
    },
  },
};
