// script to setup dev server with hot-reload

const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack.config.js')
const path = require('path');
const options = {
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    hot: true,
    inline: true,
    port: 3000,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
}

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(3000, 'localhost', () => {
    console.log('dev server listening on port 5000')
})
