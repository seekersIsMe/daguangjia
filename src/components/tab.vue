<template>
  <div class="tab-wrapper">
    <router-link class="tab-link" tag="div" to="/index">
      <div class="linkWrap">
        <div>
          <van-icon name="wap-home-o" />
        </div>
        <span>首页</span>
      </div>
    </router-link>
    <router-link class="tab-link" tag="div" to="/type">
      <div class="linkWrap">
        <div>
          <van-icon name="qr" />
        </div>
        <span>分类</span>
      </div>
    </router-link>
    <router-link class="tab-link" tag="div" to="/conversion">
      <div class="linkWrap">
        <div class="duihuan">
        </div>
        <span>兑换</span>
      </div>
    </router-link>
    <router-link class="tab-link" tag="div" to="/shoppingCart">
      <div class="linkWrap">
        <div>
          <van-icon name="shopping-cart-o" />
        </div>
        <span>购物车</span>
      </div>
    </router-link>
    <router-link class="tab-link" tag="div" to="/me">
      <div class="linkWrap">
        <div>
          <van-icon name="contact" />
        </div>
        <span>个人中心</span>
      </div>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.tab-wrapper {
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 12px;
  height: 50px;
  background: #FFFFFF;
  /*iphone XR*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    bottom: 34px;
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
    bottom: 34px;
  }
  /*iphone XMAX*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    bottom: 34px;
  }
  /* iphone X/XS */
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    bottom: 34px;
  }
  .duihuan {
    width: 60px;
    height: 60px;
    background: url(~@/assets/img/duihuan.png) no-repeat center center;
    background-size: 100% 100%;
    margin-top: -36px;
  }
  .tab-link {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333333;
    .van-icon {
      font-size: 20px;
    }
    &.router-link-active {
      color: #00AEFF
    }
  }
}
</style>
