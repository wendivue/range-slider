const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
};

const config = {
  entry: {
    plugin: `${PATHS.src}/ts/plugin.ts`,
  },
  output: {
    filename: './js/[name].js',
  },
  devtool: 'source-map',
  mode: 'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      Vars: path.resolve(__dirname, `${PATHS.src}/scss/vars`),
      Components: path.resolve(__dirname, `${PATHS.src}/components`),
      Helpers: path.resolve(__dirname, `${PATHS.src}/ts/helpers`),
      Ts: path.resolve(__dirname, `${PATHS.src}/ts`),
      UI: path.resolve(__dirname, `${PATHS.src}/ts/View/UI`),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: () => [
                require('cssnano')({
                  preset: [
                    'default',
                    {
                      discardComments: {
                        removeAll: true,
                      },
                    },
                  ],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'img/',
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: `${PATHS.src}/favicon`, to: './favicon' }],
    }),
    new MiniCssExtractPlugin(),
  ],
};

module.exports = config;
