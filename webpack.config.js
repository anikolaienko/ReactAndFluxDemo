var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: [
      './src/message.js',
      './src/app.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};