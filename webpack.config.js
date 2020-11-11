const { HotModuleReplacementPlugin } = require("webpack");

const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dev = process.env.NODE_ENV !== "production";

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, "src", "index.html"),
  filename: path.resolve(__dirname, "dist", "index.html"),
  inject: "body",
  publicPath: "dist"
});

const DefinePluginConfig = new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("production")
});

module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "dist/",
    watchContentBase: true
  },
  entry: dev
    ? [path.resolve(__dirname, "src/index.ts")]
    : ["@babel/polyfill", path.resolve(__dirname, "src/index.ts")],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/")
  },
  mode: dev ? "development" : "production",
  plugins: dev
    ? [
        HTMLWebpackPluginConfig,
        new MiniCssExtractPlugin(),
        new HotModuleReplacementPlugin()
      ]
    : [HTMLWebpackPluginConfig, new MiniCssExtractPlugin(), DefinePluginConfig]
};
