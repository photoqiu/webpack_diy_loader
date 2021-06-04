import React, { useState, useReducer, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Spin, Form, Icon, Input, Button, Row, Col, message } from "antd";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { doGetDatas } from "../../configs/base.ajax";
//'@configs/base.ajax'
import { login, loginByTicket } from "../../apis/common";
//"@apis/common";
import "../../datas/tables";
import { Pre, Line, LineNo, LineContent } from "./styles";
import _JSXStyle from "styled-jsx/style";

const fetchDataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      console.log("actions:", action);
      return {
        ...state,
        isLoading: false,
        isErroe: false,
        data: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        isErroe: false,
        data: action.payload,
      };
      break;
    default:
      return state;
  }
};

const useDataApi = (initUrl, initData) => {
  const [url, setUrl] = useState(initUrl);
  const [state, dispatch] = useReducer(fetchDataReducer, {
    data: initData,
    isLoading: false,
    isErroe: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await doGetDatas(url);
        dispatch({ type: "FETCH_SUCCESS", payload: result });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };
    fetchData();
  }, [url]);
  return [state, setUrl];
};

export default () => {
  const exampleCode = `
    (function someDemo() {
      var test = "Hello World!";
      console.log(test);
    })();
    
    return () => <App />;
    `;

  const [{ data, isLoading, isError }, fetchData] = useDataApi(
    "https://hn.algolia.com/api/v1/search?query=redux",
    { dataSource: [] }
  );

  const { path, url } = useRouteMatch();

  const todoItems = data.dataSource.map((todo, index) => (
    <article className={`post post-${index}`} key={index}>
      <header className="entry-header">
        <h1 className="entry-title">
          <Link to={`${url}posts/${todo.key}`} className="title">
            {todo.mockTitle}
          </Link>
          <style jsx>{`
            .title {
              padding: 20px;
              color: #999;
              display: block;
              font-size: 16px;
            }
          `}</style>
        </h1>
        <div className="entry-meta">
          <span className="post-category">
            <a href="#">{todo.mockAction}</a>
          </span>
          <span className="post-date">
            <a href="#">
              <time className="entry-date" dateTime={todo.createtimer}>
                {todo.createtimer}
              </time>
            </a>
          </span>
          <span className="post-author">
            <a href="#">{todo.username}</a>
          </span>
          <span className="comments-link">
            <a href="#">{todo.discuzNumbers} 评论</a>
          </span>
          <span className="views-count">
            <a href="#">{todo.readNumbers} 阅读</a>
          </span>
        </div>
      </header>
      <div className="entry-content clearfix">
        <p>{todo.mockContent}...</p>
        <Highlight {...defaultProps} code={exampleCode} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <Line key={i} {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
              ))}
            </pre>
          )}
        </Highlight>
        <div className="read-more cl-effect-14">
          <a href="#" className="more-link">
            继续阅读 <span className="meta-nav">→</span>
          </a>
        </div>
      </div>
    </article>
  ));

  return <>{todoItems}</>;
};
