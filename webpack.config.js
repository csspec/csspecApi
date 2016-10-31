var webpack = require('webpack');

var common = {
  cache: true,
  debug: true,
  entry: {
    index: './index.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: './build/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js/,
      loaders: ['babel'],
      exclude: /(node_modules|bower_components)/
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};

module.exports = common;