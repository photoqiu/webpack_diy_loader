/*
 * @Description:
 * @Author: ext.qiubo
 * @Date: 2021-01-13 10:31:44
 * @LastEditors: ext.qiubo
 * @LastEditTime: 2021-06-04 15:43:12
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { hashHistory /* , Link */ } from "react-router";
import { Spin, Form, Icon, Input, Button, Row, Col, message } from "antd";
import {
  writeStorage,
  deleteFromStorage,
  useLocalStorage,
} from "@rehooks/local-storage";
import MainHeaders from "../departments/mainHeaders";
import BlogPosts from "../departments/blogPosts";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      show: true,
      users: [],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <BlogPosts />
      </div>
    );
  }
}
