var path = require('path');

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
  }
};