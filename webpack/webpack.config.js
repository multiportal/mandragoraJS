const path = require('path');
const plugin = require('html-webpack-plugin'); 

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './../build'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, './../build'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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
  plugins:[
    new plugin({
      template: './src/index.html'
    })
  ]
};