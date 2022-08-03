const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 9001
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        /*{ from: 'src/assets/pwa/sw.js', to: 'sw.js' },*/
        { from: 'src/assets/pwa/icon/apple-icon-152x152.png', to: 'icon/apple-icon-152x152.png' },
        { from: 'src/assets/pwa/icon/apple-icon-180x180.png', to: 'icon/apple-icon-180x180.png' },
        { from: 'src/assets/pwa/icon/', to: 'assets/pwa/icon/' },
        { from: 'src/assets/img/', to: 'assets/img/' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
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