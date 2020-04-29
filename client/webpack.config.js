/* eslint-disable */

const path = require('path')

const config = (env, arg) => {
  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
      publicPath: '/'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      compress: true,
      host: '0.0.0.0',
      port: 3000,
      publicPath: '/',
      historyApiFallback: true,
      disableHostCheck: true,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.s[ac]ss$/i,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(ttf|eot|svg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
            loader: 'file-loader'
          }]
        },
      ]
    }
  }
}

module.exports = config