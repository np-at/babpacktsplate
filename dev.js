// script to setup dev server with hot-reload

const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const path = require('path');
const options = {
  transportMode: 'ws',
  // overlay: true,
  watchContentBase: true,
  contentBase: path.resolve(__dirname, 'dist/'),
  publicPath: '/dist/',
  hot: true,
  inline: true,
  // port: 443,
  host: '0.0.0.0',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  disableHostCheck: true,
};

webpackDevServer.addDevServerEntrypoints(config, options, undefined);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(3000, '0.0.0.0', () => {
  console.log('dev server listening on port 3000');
});
