const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
    entry: ["./src/ts/index.ts", "./src/scss/style.scss"],
    output: {
      filename: "./js/bundle.js"
    },
    devtool: "source-map",
    mode: "production",
    optimization: {
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          extractComments: true
        })
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
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
          include: path.resolve(__dirname, "src/scss"),
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {}
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                url: false
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                sourceMap: true,
                plugins: () => [
                  require("cssnano")({
                    preset: [
                      "default",
                      {
                        discardComments: {
                          removeAll: true
                        }
                      }
                    ]
                  })
                ]
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "./css/style.bundle.css"
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: './src/template/index.html'
      })
    ]
  };
  
  module.exports = (env, argv) => {
    if (argv.mode === "production") {
      config.plugins.push(new CleanWebpackPlugin());
    }
    return config;
  };