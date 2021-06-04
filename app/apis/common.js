/*
 * @Description:
 * @Author: ext.qiubo
 * @Date: 2021-01-13 10:31:44
 * @LastEditors: ext.qiubo
 * @LastEditTime: 2021-06-04 16:27:28
 */
import { baseURL, path } from "../configs/base.ajax";

const prefixUsers = "usercenter";

export const login = `${baseURL}${prefixUsers}/login`; // 登陆
export const loginByTicket = `${baseURL}/${prefixUsers}/loginByTicket`; // 通过ticket登陆
export const loginByKey = `${baseURL}/service/pagerservice/checkKey`; // 通过key进入项目
export const logout = `${baseURL}/${prefixUsers}/logout`; // 登出
