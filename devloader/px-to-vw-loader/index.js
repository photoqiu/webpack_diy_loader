/*
 * @Author: ext.qiubo
 * @Date: 2021-04-23 02:00:46
 * @LastEditTime: 2021-04-28 17:32:34
 * @LastEditors: ext.qiubo
 * @FilePath: \reactdegree_bak\devloader\px-to-vw-loader\index.js
 * @version: 
 */
'use strict';
const { getOptions } = require('loader-utils');
const { validateOptions } = require('schema-utils');
const postcss = require('postcss');
const pxToViewport = require('./plugins/index');
const objectAssign = require('object-assign');

var defaults = {
    unitToConvert: 'px',
    viewportWidth: 320,
    viewportHeight: 568, // not now used; TODO: need for different units and math for different properties
    unitPrecision: 5,
    viewportUnit: 'vw',
    fontViewportUnit: 'vw',  // vmin is more suitable.
    selectorBlackList: ['.ignore', '.hairlines'], // 指定不需要转换的类
    propList: ['*'],
    minPixelValue: 1,
    mediaQuery: false,
    replace: true,
    landscape: false,
    landscapeUnit: 'vw',
    landscapeWidth: 568
};
module.exports = postcss.plugin('px-to-vw-loader', function (options) {
    var opts = objectAssign({}, defaults, options);
    //var processedCss = postcss(pxToViewport()).process(css).css;
    return postcss(pxToViewport(opts));
    
});