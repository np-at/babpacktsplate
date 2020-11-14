// webpack.config.js
// webpack dev server configuration is located in /dev.js


const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, 'src', 'index.html'),
  filename: path.resolve(__dirname, 'dist', 'index.html'),
  inject: 'body',
  publicPath: 'dist',
  alwaysWriteToDisk: true,
});
const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

module.exports = {
  // @babel/polyfill makes the bundle size too large for codesandbox.io sync mechanism so don't use in dev env.
  entry: dev
    ? [path.resolve(__dirname, 'src/index.ts')]
    : ['@babel/polyfill', path.resolve(__dirname, 'src/index.ts')],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader'],
        // options: {
        //   limit: 10000,
        // },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    publicPath: '/dist/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  mode: dev ? 'development' : 'production',
  plugins: dev
    ? [
        // new CleanWebpackPlugin(),
        HTMLWebpackPluginConfig,
        new HtmlWebpackHarddiskPlugin(),
        new MiniCssExtractPlugin(),
        new HotModuleReplacementPlugin(),
        new ESLintWebpackPlugin(),
      ]
    : [HTMLWebpackPluginConfig, new MiniCssExtractPlugin(), DefinePluginConfig],
};
