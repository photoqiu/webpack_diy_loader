/*
 * @Description:
 * @Author: ext.qiubo
 * @Date: 2021-01-13 10:31:44
 * @LastEditors: ext.qiubo
 * @LastEditTime: 2021-06-04 15:42:59
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { hashHistory /* , Link */ } from "react-router";
import { Spin, Form, Icon, Input, Button, Row, Col, message } from "antd";
import MainHeaders from "../departments/mainHeaders";

export default class Error extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      show: true,
      error_datas: [],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <MainHeaders />
      </div>
    );
  }
}
