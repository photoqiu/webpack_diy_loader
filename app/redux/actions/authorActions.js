/*
 * @Description:
 * @Author: ext.qiubo
 * @Date: 2021-01-13 10:31:45
 * @LastEditors: ext.qiubo
 * @LastEditTime: 2021-06-04 17:07:06
 */
import { doGetDatas } from "../../configs/base.ajax";
import { ACTION_CONSTANTS } from "./action-type";
import { login, loginByTicket } from "../../apis/common";
import "../../datas/tables";
import "../../datas/users";

export const actions = {
  receivedAuthorResults: function (result) {
    return {
      type: ACTION_CONSTANTS.AUTHOR_RESULT_RECEIVED,
      result,
    };
  },
  fetchingAuthorResult: function () {
    return {
      type: ACTION_CONSTANTS.AUTHOR_RESULT_FETCHING,
    };
  },
  errorAuthorResult: function (error) {
    return {
      type: ACTION_CONSTANTS.AUTHOR_RESULT_ERROR,
      error,
    };
  },
  getAuthorResult: function (error) {
    return {
      type: ACTION_CONSTANTS.GET_AUTHOR_RESULT,
    };
  },
};

export default function getAuthorResults(query) {
  console.log("login:", login);
  return function (signal) {
    return async (dispatch, _, { netlifyEndpoint }) => {
      dispatch(actions.fetchingAuthorResult());
      try {
        const response = doGetDatas(login);
        if (response.ok) {
          const parsedRes = response.json();
          return dispatch(actions.receivedAuthorResults(parsedRes.data));
        }
        throw new Error("author api error");
      } catch (error) {
        dispatch(actions.errorAuthorResult(error.message));
      }
    };
  };
}
