<template>
<div class="tab-wrapper">
  <router-link  class="tab-link" tag="div" to="/index"> <span>首页</span></router-link>
  <router-link  class="tab-link" tag="div" to="/type"> <span>分类</span></router-link>
  <router-link  class="tab-link" tag="div" to="/conversion"> <span>兑换</span></router-link>
  <router-link  class="tab-link" tag="div" to="/shoppingCart"> <span>购物车</span></router-link>
  <router-link  class="tab-link" tag="div" to="/me"> <span>个人中心</span></router-link>
</div>
</template>
<style lang="scss" scoped>
  .tab-wrapper{
    position: fixed;
    z-index: 2;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    text-align: center;
    .tab-link{
      flex: 1;
      line-height: 44px;
      &.router-link-active{
        span{
          display: inline-block;
          vertical-align: middle;
          line-height: 23px;
        }
      }
    }
  }
</style>
