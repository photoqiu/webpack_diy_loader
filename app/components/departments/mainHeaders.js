/*
 * @Description:
 * @Author: ext.qiubo
 * @Date: 2021-01-13 10:31:44
 * @LastEditors: ext.qiubo
 * @LastEditTime: 2021-06-04 15:50:29
 */
import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./headers.less";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          photoqiu's Blog
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="login" className="nav-link">
                Link
              </Link>
            </li>
            <li className="nav-item">
              <Link to="posts/1" className="nav-link">
                Link2
              </Link>
            </li>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <Nav>
              <Nav.Link href="#deets">登陆</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                注册新用户
              </Nav.Link>
            </Nav>
          </form>
        </div>
      </div>
    </nav>
  );
};
