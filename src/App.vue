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
const noShowTabRoute = [
  '/login'
]
export default {
  name: 'App',
  components: {
    tab
  },
  computed: {
    isShowTab () {
      return !noShowTabRoute.includes(this.$route.path)
    }
  }
}
</script>
<style>
@import './assets/css/reset.css';
</style>
