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
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge');
const webpackConfigBase = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const os = require('os')
let selfIp
try {
    selfIp = getIpAddress()
} catch (e) {
    selfIp = '127.0.0.1'
}
const PORT = 3699
// 精确的获取本机ip地址
function getIpAddress() {
    const interfaces = require('os').networkInterfaces
    for (let devName in interfaces) {
        const iface = interfaces[devName]
        for (let i = 0; i < iface.length; i += 1) {
            let alias = iface[i]
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}
function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
    mode: 'development',
    plugins: [
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            IS_DEVELOPMETN: true,
        }),
        // 将打包后的资源注入到html文件内    
        new HtmlWebpackPlugin({
            title: 'React Dev Custom template',
            inject: true,
            filename: 'index.html',
            template: resolve('./app/templates/index.html')
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: "eval-source-map",
    devServer: {
        liveReload: true,
        contentBase: resolve('./app'),
        publicPath: '/',
        historyApiFallback: false,
        compress: true,
        open: true,
        hot: true,
        inline: false,
        host: selfIp,
        port: PORT,
    },
}
module.exports = merge(webpackConfigBase, webpackConfigDev)