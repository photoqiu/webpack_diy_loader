"use strict";
/**
 *
 *          ┌─┐       ┌─┐
 *       ┌──┘ ┴───────┘ ┴──┐
 *       │                 │
 *       │       ───       │
 *       │  ─┬┘       └┬─  │
 *       │                 │
 *       │       ─┴─       │
 *       │                 │
 *       └───┐         ┌───┘
 *           │         │
 *           │         │
 *           │         │
 *           │         └──────────────┐
 *           │                        │
 *           │                        ├─┐
 *           │                        ┌─┘
 *           │                        │
 *           └─┐  ┐  ┌───────┬──┐  ┌──┘
 *             │ ─┤ ─┤       │ ─┤ ─┤
 *             └──┴──┘       └──┴──┘
 *
 *        神兽保佑 （神兽来源与网络） 代码无BUG!
 *
 **/
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const os = require("os");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";

const fontAwesomePath = path.join(
  __dirname,
  "./node_modules/font-awesome/css/font-awesome.css"
);
const fetchPath = path.join(__dirname, "./node_modules/whatwg-fetch/fetch.js");
const fetchJsonpPath = path.join(
  __dirname,
  "./node_modules/fetch-jsonp/build/fetch-jsonp.js"
);
const jqueryPath = path.join(__dirname, "./node_modules/jquery/dist/jquery.js");
const momentPath = path.join(__dirname, "./node_modules/moment/moment.js");

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath);
}
const APP_INDEX_FILE = resolve("./app/index.js");

const webpackConfigBase = {
  entry: {
    commons: [
      "react",
      "react-dom",
      "react-redux",
      "react-router-dom",
      "immutable",
      "redux-thunk",
      "redux-actions",
      "redux",
    ],
    index: ["whatwg-fetch", "fetch-jsonp", APP_INDEX_FILE],
  },
  output: {
    path: resolve("./dist"),
    publicPath: "/",
    filename: devMode ? "[name].libs.js" : "[name].[contenthash].js",
    chunkFilename: devMode ? "[id].chunk.js" : "[id].[contenthash].js",
  },
  context: __dirname,
  resolve: {
    extensions: ["*", ".less", ".css", ".js", ".jsx", ".json"],
    alias: {
      // 减少使用别名提高编译速速
      "@app": path.join(__dirname, "./src"),
      "@actions": path.join(__dirname, "./src/redux/actions"),
      "@reducers": path.join(__dirname, "./src/redux/reducers"),
      "@apis": path.join(__dirname, "./src/apis"),
      "@components": path.join(__dirname, "./src/components"),
      "@commons": path.join(__dirname, "./src/commons"),
      "@regular": path.join(__dirname, "./src/commons/regular.config.js"),
      "@images": path.join(__dirname, "./src/assets/images"),
      "@styles": path.join(__dirname, "./src/assets/styles"),
      "@datas": path.join(__dirname, "./mockdatas"),
      jQuery: jqueryPath,
      fetch: fetchPath,
      fetchJsonp: fetchJsonpPath,
      moment: momentPath,
      fontAwesome: fontAwesomePath,
      "react-dom": devMode ? "@hot-loader/react-dom" : "react-dom", // react-hot-loader需要
    },
  },
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 30000, // 模块超过30k自动被抽离成公共模块
      minChunks: 1, // 模块被引用>=1次，便分割
      name: false, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
      automaticNameDelimiter: "~", // 命名分隔符
      cacheGroups: {
        default: {
          // 模块缓存规则，设置为false，默认缓存组将禁用
          minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
          priority: -20, // 优先级
          reuseExistingChunk: true, // 默认使用已有的模块
        },
        "draft-js": {
          test: /[\\/]node_modules[\\/]draft-js/,
          name: "draft-js",
          priority: 18,
          reuseExistingChunk: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          priority: -10, // 确定模块打入的优先级
          reuseExistingChunk: true, // 使用复用已经存在的模块
          enforce: true,
        },
      },
    },
  },
  module: {
    // noParse: /lodash/,
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: [resolve("./app")],
        use: "babel-loader?cacheDirectory=true",
      },
      {
        test: /\.tsx?$/i,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        include: [
          //样式只应用到这两个文件夹下面的css文件中
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "./app"),
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./css",
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              esModule: true,
              modules: {
                namedExport: true,
              },
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.less$/i,
        include: [
          //样式只应用到这两个文件夹下面的css文件中
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "./app"),
        ],
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            options: devMode
              ? {
                  modules: {
                    namedExport: true,
                  },
                }
              : {
                  modules: {
                    namedExport: true,
                  },
                  publicPath: "./css",
                },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              esModule: true,
              modules: {
                namedExport: true,
              },
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: resolve("./postcss.config.js"),
              },
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        include: [
          //样式只应用到这两个文件夹下面的css文件中
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "./app"),
        ],
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
              modules: {
                namedExport: true,
              },
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attributes: false,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        exclude: /node_modules/,
        include: [resolve("./app/images")],
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "[name].[hash:4].[ext]",
          outputPath: "./images",
        },
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.(ico|icon)(\?.*)?$/,
        exclude: /node_modules/,
        include: [resolve("./app/images/icon")],
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "[name].[hash:4].[ext]",
          outputPath: "./images/icon",
        },
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "./fonts/[name].[hash:4].[ext]",
        },
      },
      {
        test: /\.json$/,
        use: "json-loader",
      },
    ],
  },
  performance: false,
  plugins: [
    new MiniCssExtractPlugin({
      linkType: "text/css",
      filename: devMode ? "[name].css" : "css/[name].[contenthash].css",
      chunkFilename: devMode ? "[id].css" : "css/style.[chunkhash].[id].css",
    }),
    new FriendlyErrorsPlugin(),
    new webpack.ProvidePlugin({
      moment: "moment",
      $: "jQuery",
      jquery: "jQuery",
      jQuery: "jQuery",
      "window.jQuery": "jQuery",
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};

if (devMode) {
  webpackConfigBase.plugins.push(new webpack.HotModuleReplacementPlugin());
}
module.exports = webpackConfigBase;
