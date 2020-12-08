/*
 * @Description: API
 * @Author: liwangjun
 * @Date: 2020-12-08 14:27:27
 * @LastEditors: liwangjun
 * @LastEditTime: 2020-12-08 14:47:51
 * @FilePath: /vue-cli-template/src/util/api.js
 */
import request from './request'
let BaseUrl = ''
const API = {
  login:body=>request(BaseUrl + 'user/login','POST',body)
}
export default API