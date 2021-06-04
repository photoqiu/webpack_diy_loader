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
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: "production",
    entry: {
        vendor: [
            '@babel/polyfill',
            'react',
            'react-dom',
            'react-router',
            'whatwg-fetch',
            'lodash'
        ],
        redux: [
            'redux',
            'redux-thunk',
            'react-redux',
            'react-router-redux',
        ],
    },
    devtool: 'source-mapcheap-module-eval-souce-map',
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, './app/resource/dll'),
        library: '[name]_[hash]',
    },
    performance: false,
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, './app/resource/dll')],
            verbose: true,
        }),
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            IS_DEVELOPMETN: true,
        }),

        // 使用插件 DllPlugin
        new webpack.DllPlugin({
            path: path.join(__dirname, './app/resource/dll', '[name].manifest.json'),
            name: '[name]_[hash]',
            context: __dirname
        }),


    ]
};