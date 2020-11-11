// script to setup dev server with hot-reload

const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack.config.js')

const options = {
    contentBase: './dist',
    publicPath: "http://localhost:3000/dist/",
    hot: true,
    host: 'localhost',
    inline: true
}

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000')
})
