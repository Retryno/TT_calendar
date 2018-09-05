const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const statConf = {
  version: false,
  modules: false,
  assets: false,
  hash: false
}
const alias = {
  'project-components': path.resolve('./components'),
  'project-services': path.resolve('./services'),
  'store': path.resolve('./app/store')
}
module.exports = {
  entry: ['babel-polyfill', './app/main.js'],
  output: {
    filename: './dist/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx?)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', {'modules': false}], 'stage-0', 'react']
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        }))
      },
      {
        test: /\.(img|png|svg)$/,
        use: 'url-loader'
      }
    ]
  },
  devServer: {
    stats: statConf,
    port: '3000'
  },
  plugins: [
    new ExtractTextPlugin('./dist/bundle.css')
  ],
  resolve: {
    alias
  }
}
