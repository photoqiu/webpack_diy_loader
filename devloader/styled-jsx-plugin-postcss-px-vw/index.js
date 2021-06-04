/*
 * @Author: ext.qiubo
 * @Date: 2021-04-23 02:00:46
 * @LastEditTime: 2021-06-04 17:38:09
 * @LastEditors: ext.qiubo
 * @FilePath: \reactdegree_bak\devloader\styled-jsx-plugin-postcss-px-vw\index.js
 * @version: defaulthttps://www.jianshu.com/p/18ff0dce6afds
 */
'use strict';

const postcss = require('postcss');
const pxToVwViewport = require('./plugins/index');
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
console.log("111111111111111");
module.exports = (opts = {}) => {
  var options = Object.assign(defaults, opts);
  return {
    postcssPlugin: 'styled-jsx-plugin-postcss-px-vw',
    Once (root) {
      pxToVwViewport(root, options);
      // console.log("root:", root);
      // Calls once per file, since every file has single Root
    },
    Declaration (decl) {
      //console.log("decl:", decl);
      // All declaration nodes
    }
  }
}

module.exports.postcss = true