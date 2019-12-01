<template>
  <div class="orderList">
    <van-sticky>
      <div class="header bgW"><van-icon @click="goBack" name="arrow-left" />我的订单</div>
      <van-tabs v-model="active" @change='changeType'>
        <van-tab title="全部"></van-tab>
        <van-tab title="待支付"></van-tab>
        <van-tab title="待发货"></van-tab>
        <van-tab title="已发货"></van-tab>
      </van-tabs>
    </van-sticky>
    <div class="list" v-if="listData.length > 0">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :mmediate-check="false"
        @load="onLoad"
      >
        <div class="item bgW" v-for="(item, index) in listData" :key="index" @click="gotoOrderDetail">
          <div class="title">
            <span class="orderCode"> 订单号：{{ item.orderNo }} </span>
            <span class="orderStatus">{{ getOrderStatusText(item.orderStatus) }}</span>
          </div>
          <item :itemData="item.goodsList" />
          <div class="footer">
            <span class="color33">删除订单</span>
            <div class="right">
              <span class="color33">共{{ item.totalAmount }}件</span>
              <span class="color33">
                合计：
              </span>
              <span class="sumScore">
                {{ item.totalPrice }}
              </span>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="noPro">
        <div class="noProBg">
        </div>
        <p>购物车为空</p>
    </div>
  </div>
</template>
<script>
import item from './item'
const getOrderListUrl = '/sysOrder/getOrders'
export default {
  components: {
    item
  },
  data () {
    return {
      active: 0,
      loading: false,
      finished: false,
      page: 1,
      userId: localStorage.getItem('userId'),
      listData: []
    }
  },
  created () {
    this.active = this.$route.query.hasOwnProperty('type') ? this.$route.query.type + 1 : 0
    this.getOrderList()
  },
  methods: {
    changeType () {
      this.page = 1
      this.listData = []
      this.getOrderList()
    },
    getOrderStatusText (key) {
      let obj = new Map()
      obj.set(-1, '关闭')
      obj.set(0, '待支付')
      obj.set(1, '已发送')
      obj.set(2, '已完成')
      return obj.get(key)
    },
    getOrderList () {
      this.$axios({
        url: getOrderListUrl,
        method: 'post',
        params: {
          uid: this.userId,
          orderStatus: this.active === 0 ? '' : this.active - 1,
          page: this.page
        }
      }, res => {
        if (res.status === 10001) {
          this.listData = [...this.listData, ...res.data.info]
          this.loading = false
          if (res.data.info && res.data.info.length < 10) {
            this.finished = true
          }
        } else {
          this.$toast(res.msg)
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    gotoOrderDetail () {
      this.$router.push({
        path: '/orderDetail'
      })
    },
    onLoad () {
      this.page++
      !this.finished && this.getOrderList()
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .van-tabs{
  /deep/.van-tab--active{
  color: #00AEFF;
}
/deep/.van-tabs__line{
  background-color: #00AEFF;
}
}
.bgW {
  background: white;
}
.orderList {
   /*iphone XR*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    height: calc(100vh - 34px);
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
    height: calc(100vh - 34px);
  }
  /*iphone XMAX*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    height: calc(100vh - 34px);
  }
  /* iphone X/XS */
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    height: calc(100vh - 34px);
  }
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
  background: #f7f7f7;
}
.header {
  position: relative;
  text-align: center;
  height: 40px;
  line-height: 40px;
  .van-icon {
    position: absolute;
    top: 11px;
    left: 10px;
  }
}
.item {
  padding: 10px;
  margin-top: 10px;
}
.title {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  .orderCode {
    color: #333333;
  }
  .orderStatus {
    color: #00aeff;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  .color33 {
    color: #999999;
  }
  .sumScore {
    color: #ff0000;
    font-weight: 500;
  }
}
.noPro{
    margin-top: 20vw;
    color: #999999;
    font-size: 14px;
    text-align: center;
    .noProBg{
        margin: auto;
        width: 160px;
        height: 260px;
        background: url(~@/assets/img/noPro.png) no-repeat center center;
        background-size: 100% 100%;
    }
    p{
        margin-top: 20px;
    }
}
</style>
