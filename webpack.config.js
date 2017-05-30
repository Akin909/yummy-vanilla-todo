const webpack = require('webpack');
const path = require('path');

module.exports = {
  //babel-polyfill allows use of features such as generators and async and
  //await
  context: __dirname + '/src', //root of project
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },

  devtool: 'cheap-module-source-map',

  devServer: {
    contentBase: __dirname + '/src'
  },

  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [{ loader: 'babel-loader' }]
      }
    ]
  }
};
