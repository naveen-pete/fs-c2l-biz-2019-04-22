const path = require('path');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/app.js']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: 'dist'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0']
          }
        }
      }
    ]
  },

  mode: 'development'
};
