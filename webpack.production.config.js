const baseConfig = require('./webpack.base.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const productionConfig = merge(baseConfig, {
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        extractComments: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [new CleanWebpackPlugin()],
});

module.exports = () => {
  return productionConfig;
};
