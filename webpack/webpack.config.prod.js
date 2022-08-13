const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
  },
  /*performance : {
    hints : false
  },*/
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/pwa/sw.js', to: 'sw.js' },
        { from: 'src/assets/pwa/manifest.json', to: 'manifest.json'},
        { from: 'src/assets/pwa/icon/apple-icon-152x152.png', to: 'icon/apple-icon-152x152.png' },
        { from: 'src/assets/pwa/icon/apple-icon-180x180.png', to: 'icon/apple-icon-180x180.png' },
        { from: 'src/assets/pwa/icon/', to: 'assets/pwa/icon/' },
        { from: 'src/assets/img/', to: 'assets/img/' },
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [{loader: MiniCssExtractPlugin.loader,},"css-loader",],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {loader: MiniCssExtractPlugin.loader,},
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devtool: "eval-source-map",
};