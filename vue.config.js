const path = require('path');

module.exports = {
  devServer: {
    port: 5555,
    allowedHosts: ['demo.grakairos.com', '.grakairos.com', 'localhost'],
    sockPath: '/sockjs-node',
  },
  chainWebpack(config) {
    // Use same origin for HMR socket: https://demo.grakairos.com/sockjs-node when page is demo.grakairos.com.
    config.resolve.alias.set(
      path.resolve(__dirname, 'node_modules/webpack-dev-server/client/utils/createSocketUrl.js'),
      path.resolve(__dirname, 'src/dev/createSocketUrl.wds.js')
    );
  },
};
