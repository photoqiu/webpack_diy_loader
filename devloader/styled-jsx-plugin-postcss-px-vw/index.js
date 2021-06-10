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
console.log("11111111111");
module.exports = (options = {}) => {
  const opts = Object.assign(defaults, options);
  const getUnitRegexp = (unit) => {
      return new RegExp(
          "\"[^\"]+\"|'[^']+'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)" + unit, "g"
      );
  };
  const pxRegex = getUnitRegexp(opts.unitToConvert);
  const toFixed = (number, precision) => {
      var multiplier = Math.pow(10, precision + 1),
          wholeNumber = Math.floor(number * multiplier);
      return (Math.round(wholeNumber / 10) * 10) / multiplier;
  };
  const createPxReplace = (opts) => {
      return function (m, $1) {
          if (!$1) return m;
          var pixels = parseFloat($1);
          if (pixels <= opts.minPixelValue) return m;
          var parsedVal = toFixed(
              (pixels / opts.viewportWidth) * 100,
              opts.unitPrecision
          );
          return parsedVal === 0 ? "0" : parsedVal + opts.viewportUnit;
      };
  }
  const px2vw = (source, opts = defaults) => {
      return source.replace(pxRegex, createPxReplace(opts));
  };
  debugger;
  return {
    postcssPlugin: 'styled-jsx-plugin-postcss-px-vw',
    Once: async (root, helpers) => {
      const vwStyle = px2vw(root.source.input.css, opts);
      console.log("1111111111111111111111 root:", root);
      console.log("3333333333333333333333 root:", root.source.input.css);
      console.log("2222222222222222222222 root:", vwStyle);
    },
    Declaration (decl) {
      // console.log("2222222222222");
      // const vwStyle = px2vw(decl.source.input.css, opts);
      // console.log("decl:", decl, decl.source.input.css);
    }
  }
}

module.exports.postcss = true