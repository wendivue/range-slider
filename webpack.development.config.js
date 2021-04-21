const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const developmentConfig = merge(baseConfig, {
  mode: 'development',
  devServer: {
    index: 'demo.html',
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    port: 8078,
  },
});

module.exports = () => {
  return developmentConfig;
};
