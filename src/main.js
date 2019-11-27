import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import {axiosUtil} from './api/axios'
// import { Lazyload } from 'vant'

Vue.use(Vant)
// Vue.use(Lazyload)
Vue.config.productionTip = false
Vue.prototype.$axios = axiosUtil
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
router.beforeEach((to, form, next) => {
  document.title = to.meta.title || '大积分管家'
  next()
})
