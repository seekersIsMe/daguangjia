let baseUrl = window.document.location.pathname

/* 获取项目所在的基础路径，即域名之后的第一段路径 */
baseUrl = baseUrl.substring(0, baseUrl.substr(1).indexOf('/') + 1)

/* 开发环境用wxqyh段进行代理 */
if (window._isDevEnv_ && baseUrl === '/vm') {
  baseUrl = '/wxqyh'
}

export default baseUrl
