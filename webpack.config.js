const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { name, version, description = "" } = require("./package.json");
const {
  buildVersionInfo,
} = require("./libs/buildVersionInfo/buildVersionInfo");

module.exports = async (env = {}, args) => {
  const mode = args.mode;
  const isProd = mode === "production";
  const settings = env.settings || "localhost";
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
      proxy: {
        "/api": {
          target: "http://185.70.185.67:3000",
          logLevel: "debug",
          pathRewrite: { "^/api": "" },
          changeOrigin: true,
        },
      },
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
        // Используем svgr/webpack loader для импортов
        //`import { ReactComponent as Something } from './image.svg'`
        // https://github.com/svg/svgo
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
                      // отключаем удаление viewBox в svg
                      removeViewBox: false,
                    },
                  ],
                },
                titleProp: true,
                ref: true,
              },
            },
            // Для импорта в styled css url('./img/image.svg');
            {
              loader: "file-loader",
              options: {
                name: "static/img/[name].[contenthash:6].[ext]",
              },
            },
          ],
          generator: { filename: "static/img/[name].[contenthash:6][ext]" },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.[chunkhash].css",
        experimentalUseImportModule: false,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        hash: true,
        template: "./src/index.html",
        filename: "index.html",
        favicon: "./src/assets/images/favicon.ico",
      }),
      new webpack.DefinePlugin({
        __INFO__: JSON.stringify(info),
        "process.env": JSON.stringify(process.env),
      }),
    ],
  };

  // for development
  if (!isProd) {
    config.plugins = [
      ...config.plugins,
      new ESLintPlugin({
        extensions: ["js", "mjs", "jsx", "ts", "tsx"],
        failOnError: false,
        cache: true,
      }),
    ];
  }

  // for production
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
              // вырезает комментарии
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
        // минимизирует css = удаляет переносы строк
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
