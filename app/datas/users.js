/*
 * @Description:
 * @Author: ext.qiubo
 * @Date: 2021-01-13 10:31:44
 * @LastEditors: ext.qiubo
 * @LastEditTime: 2021-06-04 16:59:22
 */
import Mock from "mockjs";
import { baseURL } from "../configs/config.data";

Mock.setup({
  timeout: "1200-1600",
});
const prefixUsers = "usercenter";
const url = {
  login: `${baseURL}${prefixUsers}/login`,
  logout: `${baseURL}${prefixUsers}/logout`,
  register: `${baseURL}${prefixUsers}/registers`,
};
module.exports = [
  Mock.mock(url.login, "GET", {
    "dataSource|5": [
      {
        "key|+1": 1,
        "mockTitle|1": ["哑巴", "Butter-fly", "肆无忌惮", "摩天大楼", "初学者"],
        "mockContent|1": [
          "你翻译不了我的声响",
          "数码宝贝主题曲",
          "摩天大楼太稀有",
          "像海浪撞破了山丘",
        ],
        "mockAction|1": ["下载", "试听", "喜欢"],
      },
    ],
  }),
];
