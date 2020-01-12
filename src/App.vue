<template>
  <div id="app">
    <keep-alive include="index, proList, shoppingCart">
      <router-view ></router-view>
      <!--这里是会被缓存的组件-->
    </keep-alive>
    <tab v-show="isShowTab"></tab>
  </div>
</template>
<script>
import tab from './components/tab'
const showTabRoute = ['/', '/index', '/me', '/shoppingCart', '/type', '/conversion']
export default {
  name: 'App',
  components: {
    tab
  },
  computed: {
    isShowTab () {
      return showTabRoute.includes(this.$route.path)
    }
  }
}
</script>
<style>
@import "./assets/css/reset.css";
</style>
