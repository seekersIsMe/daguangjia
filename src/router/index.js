import Vue from 'vue'
import Router from 'vue-router'
import index from './index/index'
Vue.use(Router)
export default new Router({
  routes: [...index]
})
