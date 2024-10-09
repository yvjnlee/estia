const path = require('path');

module.exports = {
  entry: './src/butterup.js',
  output: {
    filename: 'butterup.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'butterup',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};