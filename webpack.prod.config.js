'use strict';
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
const webpack = require('webpack')
const path = require('path')
const webpackConfigBase = require('./webpack.base.config')
const Copy = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require("terser-webpack-plugin");
const CompressWebpackPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const AsyncUploadersFiles = require("./plugins/src/index");
//const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require('webpack-merge');

const configSSH =
{
  "localPath": "E:\\javascript\\reactdegree_bak\\dist\\",
  "remotePath": "/home/pi/Public/website",
  "protectedRemotePath": "/home/pi/Public/website",
  "connect": {
      "host": "192.168.31.164",
      "port": 22,
      "username": "pi",
      "password": "raspberry"
    }
};

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
    mode: 'production',
    output: {
        publicPath: './',
    },
    devtool: 'cheap-source-map',
    optimization: {
        minimize: true,
        // minimizer: [
        //     new TerserPlugin({
        //         terserOptions: {
        //             format: {
        //                 comments: false
        //             },
        //         },
        //         extractComments: false,
        //         minify: (file, sourceMap) => {
        //             // https://github.com/mishoo/UglifyJS2#minify-options
        //             const uglifyJsOptions = {
        //               /* your `uglify-js` package options */
        //                 toplevel: true,
        //                 compress: {
        //                     global_defs: {
        //                         "@console.log": "alert"
        //                     },
        //                     passes: 2
        //                 },
        //                 output: {
        //                     beautify: false
        //                 }
        //             };
        //             if (sourceMap) {
        //                 uglifyJsOptions.sourceMap = {
        //                     content: sourceMap
        //                 }
        //             }
        //             return require("uglify-js").minify(file, uglifyJsOptions);
        //         }
        //     }),
        // ]
    },
    plugins: [
        // 定义环境变量为开发环境
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            IS_DEVELOPMETN: false,
        }),
        // 将打包后的资源注入到html文件内    
        new HtmlWebpackPlugin({
            title: 'React Dev Custom template',
            inject: true,
            filename: 'index.html',
            template: resolve('./app/templates/index.html')
        }),
        new AsyncUploadersFiles(configSSH)
    ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)