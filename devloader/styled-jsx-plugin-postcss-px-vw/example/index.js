/*
 * @Author: ext.qiubo
 * @Date: 2021-04-28 15:35:28
 * @LastEditTime: 2021-04-28 15:48:11
 * @LastEditors: ext.qiubo
 * @FilePath: \reactdegree_bak\devloader\px-to-vw-loader\example\index.js
 * @version: 
 */
'use strict';

var fs = require('fs');
var styledJsxPluginPostcssPxVw = require('..');
var css = fs.readFileSync('main.css', 'utf8');
var processedCss = styledJsxPluginPostcssPxVw({}, css);

fs.writeFile('main-viewport.prod.css', processedCss, function (err) {
  if (err) {
    throw err;
  }
  console.log('File with viewport units written.');
});
