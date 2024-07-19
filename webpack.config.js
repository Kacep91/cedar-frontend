const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { name, version, description = "" } = require("./package.json");
const { buildVersionInfo } = require("./libs/buildVersionInfo/buildVersionInfo");

module.exports = async (env = {}, args) => {
  const mode = args.mode;
  const isProd = mode === "production";
  const settings = env.settings || "79.174.95.133";
  require("dotenv").config({ path: "./.env" });
  require("dotenv").config({ path: `.env.${settings}` });
  const info = await buildVersionInfo({ name, version, description });

  const config = {
    target: "browserslist",
    mode,
    entry: ["./src/index.tsx"],
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      filename: "js/[name].[fullhash].chunk.js",
      chunkFilename: "js/[name].[fullhash].chunk.js",
    },
    cache: {
      type: "filesystem",
    },
    devtool: isProd ? false : "source-map",
    devServer: {
      port: 9010,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'src'),
      },
      proxy: [
        {
          context: ["/api"],
          target: "https://siberia-organic.com:3000",
          logLevel: "debug",
          pathRewrite: { "^/api": "" },
          changeOrigin: true,
        }
      ],
      client: {
        overlay: false,
      },
    },
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      symlinks: false,
    },
    module: {
      rules: [
        {
          test: /\.js|jsx/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              plugins: [
                "babel-plugin-transform-class-properties",
                "babel-plugin-transform-react-qa-classes",
                "@babel/plugin-syntax-flow",
                "babel-plugin-styled-components",
              ],
            },
          },
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.(css|scss)$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|jpg|jpeg)$/,
          type: "asset/resource",
        },
        {
          test: /\.(mp4|doc)$/,
          use: 'file-loader?name=videos/[name].[ext]',
        },
        {
          test: /\.svg$/,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [
                    {
                      removeViewBox: false,
                    },
                  ],
                },
                titleProp: true,
                ref: true,
              },
            },
            {
              loader: "file-loader",
              options: {
                name: "static/img/[name].[contenthash:6].[ext]",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: './src/js/tilda-animation-1.0.min.js', to: 'js' }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: "styles.[chunkhash].css",
        experimentalUseImportModule: false,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        hash: true,
        template: "./src/index.html",
        filename: "index.html",
        favicon: "./src/favicon.ico",
      }),
      new webpack.DefinePlugin({
        __INFO__: JSON.stringify(info),
        "process.env": JSON.stringify(process.env),
      }),
    ],
  };

  if (!isProd) {
    config.plugins.push(
      new ESLintPlugin({
        extensions: ["js", "mjs", "jsx", "ts", "tsx"],
        failOnError: false,
        cache: true,
      })
    );
  }

  if (isProd) {
    config.optimization = {
      minimize: true,
      mergeDuplicateChunks: true,
      concatenateModules: true,
      flagIncludedChunks: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      providedExports: true,
      usedExports: true,
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.swcMinify,
          parallel: true,
          test: /\.m?js|tsx(\?.*)?$/i,
          extractComments: false,
          terserOptions: {
            output: {
              comments: false,
            },
            compress: {
              inline: true,
              unused: true,
              dead_code: true,
              drop_console: true,
              drop_debugger: true,
              reduce_vars: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: "async",
        maxSize: 256000,
        maxInitialRequests: 120,
        maxAsyncRequests: 120,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    };
  }

  return config;
};