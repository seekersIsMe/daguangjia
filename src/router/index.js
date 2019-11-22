import Vue from 'vue'
import Router from 'vue-router'
import index from './index/index'
import me from './me'
import shoppingCart from './shoppingCart'
import type from './type'
import conversion from './conversion'
Vue.use(Router)
export default new Router({
  routes: [...index, ...me, ...shoppingCart, ...type, ...conversion]
})
