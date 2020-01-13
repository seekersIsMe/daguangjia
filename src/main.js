import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vant from 'vant'
import Vuex from 'vuex'
import 'vant/lib/index.css'
import {axiosUtil} from './api/axios'
import routes from './router'
import VueJsonp from 'vue-jsonp'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Vconsole from 'vconsole'
if (process.env.NODE_ENV === 'development') {
  new Vconsole()
}
Vue.use(VueAwesomeSwiper)
Vue.use(VueJsonp)
Vue.use(Vant)
Vue.use(Vuex)
Vue.use(VueRouter)
// Vue.use(Lazyload)
Vue.config.productionTip = false
Vue.prototype.$axios = axiosUtil
const router = new VueRouter({
  mode: 'history',
  routes
})
// let toURL = null
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    window.localStorage.removeItem('isLogin')
  }
  if ((!window.localStorage.getItem('isLogin') && to.path !== '/login' && to.path !== '/index')) {
    next({
      path: '/login',
      query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  } else {
    // if (toURL === to.path) {
    //   next()
    // }
    // if (to.path !== from.path && toURL !== to.path && ['/', '/index', '/me', '/shoppingCart', '/type', '/conversion'].includes(to.path)) {
    //   toURL = to.path
    //   router.replace(to.path)
    //   next()
    // } else {
    //   toURL = to.path
    //   next()
    // }
    next()
  }
  // 动态标题
  document.title = to.meta.title || '大积分管家'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
