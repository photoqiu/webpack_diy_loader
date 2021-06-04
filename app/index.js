/*
 * @Description:
 * @Author: ext.qiubo
 * @Date: 2021-01-13 10:31:44
 * @LastEditors: ext.qiubo
 * @LastEditTime: 2021-06-04 14:22:31
 */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader/root";
import RouteConfig from "./configs/router.config";
import { stores } from "./store";
import "bootstrap/dist/css/bootstrap.css";

const HotRoutes = hot(RouteConfig);

ReactDOM.render(
  <Provider store={stores}>
    <HotRoutes />
  </Provider>,
  document.getElementById("app")
);
