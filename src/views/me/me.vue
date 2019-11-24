<template>
  <div class="meWrap">
    <div class="header">
      <div class="title">
        <van-icon name="arrow-left" @click="goback" />
        <span class="f18">个人中心</span>
        <van-icon name="user-o" />
      </div>
      <div class="meInfo">
        <van-image class="aiv" round width="64px" height="64px" :src="aivSrc" />
        <p class="name">{{name}}</p>
        <p class="company">
          <span>{{address}}</span>
          <span>{{company}}</span>
        </p>
      </div>
    </div>
    <div class="orderWrap">
      <div class="title">我的订单</div>
      <div class="orderIcon">
        <van-row type="flex" justify="space-between">
          <van-col span="6">
            <div class="icon1 icon"></div>
            <p>待支付</p>
          </van-col>
          <van-col span="6">
            <div class="icon2 icon"></div>
            <p>待发货</p>
          </van-col>
          <van-col span="6">
            <div class="icon3 icon"></div>
            <p>已完成</p>
          </van-col>
          <van-col span="6">
            <div class="icon4 icon"></div>
            <p>全部</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="scoreWrap">
      <div class="title">我的积分</div>
      <div class="scoreIcon">
        <van-row type="flex" justify="space-between">
          <van-col span="6">
            <div class="icon">{{sumScore}}</div>
            <p>总积分</p>
          </van-col>
          <van-col span="6">
            <div class="icon">{{spendScore}}</div>
            <p>已消费</p>
          </van-col>
          <van-col span="6">
            <div class="icon">{{loseEfficacyScore}}</div>
            <p>已失效</p>
          </van-col>
          <van-col span="6">
            <div class="icon icon1"></div>
            <p>明细</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="addressWrap">
      <van-cell title="我的地址" is-link />
    </div>
    <div class="unbind">解绑手机号</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '向阳的微笑(133****0223)',
      aivSrc:
        'http://img3.duitang.com/uploads/item/201605/07/20160507191419_J2m8R.thumb.700_0.jpeg',
      address: '广州',
      company: '| 向阳集团',
      sumScore: 1000000,
      spendScore: 50000,
      loseEfficacyScore: 10000
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.meWrap {
  background: #f7f7f7;
  height: calc(100vh - 70px);
  .header {
    height: 180px;
    background: #00aeff;
    position: relative;
    margin-bottom: 10px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      padding: 0 15px;
      font-size: 18px;
      line-height: 40px;
      .f18 {
        font-size: 18px;
        font-weight: 500;
      }
    }
    .meInfo {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      color: #333333;
      font-size: 15px;
      height: 107px;
      background: url(~@/assets/img/tuoyuan.png) no-repeat center center;
      background-size: 110% 100%;
      padding-bottom: 10px;
      .aiv {
        display: inline-block;
        transform: translateY(-32px);
      }
      .name {
        margin-bottom: 10px;
      }
    }
  }
  .scoreWrap {
    background: white;
    margin-bottom: 10px;
    .title {
      line-height: 40px;
      color: #000000;
      font-size: 18px;
      font-weight: 500;
      padding-left: 20px;
      border-bottom: 1px solid #dddddd;
    }
    .scoreIcon {
      padding: 15px 20px;
      text-align: center;
      p {
        font-size: 15px;
      }
      .icon {
        margin: auto;
        color: #00aeff;
        font-size: 18px;
        height: 28px;
        line-height: 28px;
        margin-bottom: 10px;
      }
      .icon1 {
        width: 25px;
        height: 28px;
        background: url(~@/assets/img/me/mingxi.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
  .orderWrap {
    background: white;
    margin-bottom: 10px;
    .title {
      line-height: 40px;
      color: #000000;
      font-size: 18px;
      font-weight: 500;
      padding-left: 20px;
      border-bottom: 1px solid #dddddd;
    }
    .orderIcon {
      padding: 15px 20px;
      text-align: center;
      p {
        margin-top: 4px;
        font-size: 15px;
      }
      .icon {
        margin: auto;
      }
      .icon1 {
        width: 44px;
        height: 40px;
        background: url(~@/assets/img/me/icon1.png) no-repeat center center;
        background-size: 100% 100%;
      }
      .icon2 {
        width: 44px;
        height: 40px;
        background: url(~@/assets/img/me/icon2.png) no-repeat center center;
        background-size: 100% 100%;
      }
      .icon3 {
        width: 45px;
        height: 40px;
        background: url(~@/assets/img/me/icon3.png) no-repeat center center;
        background-size: 100% 100%;
      }
      .icon4 {
        width: 37px;
        height: 40px;
        background: url(~@/assets/img/me/icon4.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
  .addressWrap {
    margin-bottom: 10px;
    .van-cell {
      color: #000000;
      font-size: 18px;
      font-weight: 500;
      padding: 0 20px;
      line-height: 40px;
      align-items: center;
    }
  }
  .unbind {
    color: #ff0000;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    background: white;
  }
}
</style>
