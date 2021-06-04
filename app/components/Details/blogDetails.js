import React,  { useState, useReducer, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { PageHeader, Button, Descriptions } from 'antd'

export default () => {
    const {id} = useParams()
    console.log("id:" + id)

    return (
        <div className="site-page-header-ghost-wrapper">
            博客详情页面。。。。。
        </div>
    )
}