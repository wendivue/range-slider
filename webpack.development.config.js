const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
};

const developmentConfig = merge(baseConfig, {
  entry: {
    demo: `${PATHS.src}/demo/demo.ts`,
  },
  mode: 'development',
  devServer: {
    index: 'demo.html',
    contentBase: `${PATHS.dist}`,
    compress: true,
    port: 8078,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new HtmlWebpackPlugin({
      filename: 'demo.html',
      template: `${PATHS.src}/demo/demo.html`,
    }),
  ],
});

module.exports = () => {
  return developmentConfig;
};
