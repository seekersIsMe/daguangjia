import axios from 'axios'
// const root = process.env.API_ROOT

/* 默认请求封装参数 */
const defaultParams = {
  url: '',
  method: 'get',
  params: null,
  contentType: 'json'
}

export function axiosUtil (axiosParams, callback) {
  axiosParams = Object.assign({}, defaultParams, axiosParams)
  let headersType = ''
  if (axiosParams.contentType === 'json') {
    headersType = 'application/json;charset=utf-8'
  } else {
    headersType = 'application/x-www-form-urlencoded'
  }
  let accessToken = sessionStorage.getItem('access_token')
  var api = axios.create({
    headers: {
      'content-type': headersType,
      // 'Authorization': accessToken,
      token: accessToken
    },
    baseURL: `/apiNginx`
  })
  let urlParams = ''
  if (axiosParams.contentType === 'form' && axiosParams.method === 'post') {
    urlParams = new URLSearchParams()
    for (let key in axiosParams.params) {
      urlParams.append(key, axiosParams.params[key]) // 你要传给后台的参数值 key/value
    }
  } else {
    urlParams = axiosParams.params
  }
  if (axiosParams.method === 'post') {
    api
      .post('/integral/api' + axiosParams.url, urlParams)
      .then(function (res) {
        callback(res.data)
      })
      .catch(() => {
        // 这里会捕获内部异样，例如语法异常
        this.$toast('系统异常，请刷新页面重试')
        // console.log(err.message, axiosParams.url)
        //   Message.error('请联系系统管理员');
      })
  } else {
    api
      .get('/integral/api' + axiosParams.url, { params: urlParams })
      .then(function (res) {
        callback(res.data)
      })
      .catch(() => {
        this.$toast('系统异常，请刷新页面重试')
        // console.log(err.message, axiosParams.url)
        //   Message.error('请联系系统管理员');
      })
  }
}
