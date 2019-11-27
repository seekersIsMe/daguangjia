<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab v-show="isShowTab"></tab>
  </div>
</template>
<script>
import tab from './components/tab'
const showTabRoute = [
  '/',
  '/index',
  '/me',
  '/shoppingCart',
  '/type'
]
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
@import './assets/css/reset.css';
</style>
