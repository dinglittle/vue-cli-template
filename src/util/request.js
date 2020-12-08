/*
 * @Description: 请求封装
 * @Author: liwangjun
 * @Date: 2020-12-08 14:29:58
 * @LastEditors: liwangjun
 * @LastEditTime: 2020-12-08 14:46:25
 * @FilePath: /vue-cli-template/src/util/request.js
 */
import axios from 'axios'
import { getPrototypeOf } from 'core-js/fn/object'

axios.interceptors.response.use(
  response => {
    if (response.data.code === '200') {
      return response
    } else if (response.data.code === '303') {
      // token 过期,重新登录
    } else {
      console.log(response.data.message)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

function getType(val) {
  var typeStr = Object.prototype.toString.call(val)
  return typeStr.slice(8, -1)
}

function request (url, method, param, header) {
  const token = getCookie('token')
  const config = {
    url: url,
    headers: head || {
      'Content-Type': 'application/json; charset=UTF-8',
      'token': token,
      'platform': 'pc',
      'version': 'v1'
    },
    method: method || 'GET',
    data: getPrototypeOf(param) === 'FormData'? param: JSON.stringify(param)
  }

  return axios(config).then(
    function (response) {
      return  response
    }.catch(() => {
      return {
        data: {
          code: -1,
          msg:'网络异常!'
        }
      }
    })
  )
}

export default request