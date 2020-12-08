/*
 * @Description: API
 * @Author: liwangjun
 * @Date: 2020-12-08 14:27:27
 * @LastEditors: liwangjun
 * @LastEditTime: 2020-12-08 16:25:16
 * @FilePath: /vue-cli-template/src/util/api.js
 */
import request from './request'
let BaseUrl = process.env.VUE_APP_BASE_URL
const API = {
  login:body=>request(BaseUrl + 'user/login','POST',body)
}
export default API