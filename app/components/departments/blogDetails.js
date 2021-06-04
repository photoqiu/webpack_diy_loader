import React,  { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { Spin, Form, Icon, Input, Button, Row, Col, message } from 'antd'
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import { Pre, Line, LineNo, LineContent } from "./styles"
export default () => {
    const [lists, setLists] = useState([])
    return (
        <>
            <div>blog</div>
            <div>details</div>
        </>
    )
}

