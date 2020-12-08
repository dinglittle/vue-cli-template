/*
 * @Description: getCookie
 * @Author: liwangjun
 * @Date: 2020-12-08 14:45:44
 * @LastEditors: liwangjun
 * @LastEditTime: 2020-12-08 14:46:03
 * @FilePath: /vue-cli-template/src/util/getcookie.js
 */
function getCookie(name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null
}
export default getCookie