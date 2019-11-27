<template>
  <div class="orderDetail">
    <div class="header">
      <van-icon @click="goBack" name="arrow-left" />
      <p class="stateName">
        {{ stateName[0] }}
      </p>
      <p class="lastTime" v-if="type === 0">订单在{{ lastTime }}内完成付款!</p>
    </div>
    <div class="body bgW">
      <item :itemData="itemData" />
      <div class="sumDetail">
        <span>公{{ count }}件</span>
        <span>合计：</span>
        <span class="score">{{ score }}积分</span>
      </div>
    </div>
    <div class="footer bgW">
      <div class="orderCode">
        <span>
          订单编号
        </span>
        <span>
          {{ orderCode }}
        </span>
      </div>
      <div class="orderTime">
        <span>
          订单时间
        </span>
        <span>
          {{ orderTime }}
        </span>
      </div>
    </div>
    <div class="btnGroup bgW">
      <van-button type="primary" color="#FF0000" @click="closeOrder"
        >关闭订单</van-button
      >
      <van-button type="primary" color="#00AEFF">立即兑换</van-button>
    </div>
  </div>
</template>
<script>
import item from './item'
export default {
  components: {
    item
  },
  data() {
    return {
      type: 0,
      orderTime: '2019-11-26',
      orderCode: '432156321365413',
      stateName: ['待支付', '已发货', '待发货', '交易成功', '订单关闭'],
      lastTime: '29分59秒',
      count: 10000,
      score: 9999999,
      itemData: [
        {
          src: '',
          detail:
            'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 1000,
          count: 20
        },
        {
          src: '',
          detail:
            'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 1000,
          count: 20
        }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    closeOrder() {
      this.$dialog
        .confirm({
          title: '关闭订单',
          message: '请确定是否关闭订单'
        })
        .then(() => {
          // on close
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.bgW {
  background: white;
}
.orderDetail {
  /*iphone XR*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    padding-bottom: 34px;
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
    padding-bottom: 34px;
  }
  /*iphone XMAX*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    padding-bottom: 34px;
  }
  /* iphone X/XS */
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    padding-bottom: 34px;
  }
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
  background: #f7f7f7;
  position: relative;
  .header {
    height: 32vw;
    background: url(~@/assets/img/orderBg.png);
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
    color: white;
    .van-icon {
      position: absolute;
      left: 10px;
      top: 20px;
    }
    p {
      margin-left: 35px;
    }
    .stateName {
      margin-top: 12vw;
      font-size: 20px;
    }
    .lastTime {
      font-size: 13px;
      margin-top: 20px;
    }
  }
}
.body {
  padding: 0 10px 10px 10px;
  .sumDetail {
    text-align: right;
    font-size: 14px;
    color: #999999;
    padding: 0 10px;
    line-height: 30px;
    .score {
      font-size: 15px;
      color: #ff0000;
      font-weight: 500;
    }
  }
}
.footer {
  margin-top: 10px;
  font-size: 13px;
  color: #666666;
  padding: 0 10px;
  .orderCode,
  .orderTime {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
  }
}
.btnGroup {
  display: flex;
  justify-content: flex-end;
  padding: 5px 15px;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  .van-button {
    border-radius: 5px;
  }
  .van-button:last-of-type {
    margin-left: 10px;
  }
}
</style>
