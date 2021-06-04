/*
 * @Description:
 * @Author: ext.qiubo
 * @Date: 2021-01-13 10:31:44
 * @LastEditors: ext.qiubo
 * @LastEditTime: 2021-06-04 16:57:53
 */
import React, { Component } from "react";
import { connect, useDispatch } from "react-redux";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import getAuthorResults from "../../redux/actions/authorActions";
import { Spin, Form, Icon, Input, Button, Row, Col, message } from "antd";
import BlogDetails from "../departments/blogDetails";
import {
  writeStorage,
  deleteFromStorage,
  useLocalStorage,
} from "@rehooks/local-storage";

function mapStateToProps(state) {
  return { index_datas: state.authorResults.results };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getAuthorResults }, dispatch),
  };
}

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      show: true,
      index_datas: [],
    };
  }

  componentDidMount() {
    console.log("this.props.match.params:", this.props.match.params);
  }

  render() {
    return (
      <div className="container">
        <BlogDetails />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
