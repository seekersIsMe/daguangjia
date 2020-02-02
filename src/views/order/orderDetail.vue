<template>
  <div class="orderDetail">
    <div class="header">
      <van-icon @click="goBack" name="arrow-left" />
      <p class="stateName">{{ stateName[type+1] }}</p>
      <p class="lastTime" v-if="type === 0">订单在{{ lastTime }}内完成付款!</p>
    </div>
    <div class="body">
      <div class="order bgW" v-for="(item,index) in orderData" :key="index">
        <div class="shopTitle">
          <van-icon name="shop-o" />
          {{item.shopName}}
        </div>
        <item :itemData="item.goodsList" />
      </div>
      <div class="sumDetail bgW">
        <span>公{{ count }}件</span>
        <span>合计：</span>
        <span class="score">{{ score }}积分</span>
      </div>
    </div>
    <div class="footer bgW">
      <div class="orderCode">
        <span>订单编号</span>
        <span>{{ orderCode }}</span>
      </div>
      <div class="orderTime">
        <span>订单时间</span>
        <span>{{ orderTime }}</span>
      </div>
    </div>
    <div class="btnGroup bgW" v-if="type === 0">
      <van-button type="primary" color="#FF0000" @click="closeOrder">关闭订单</van-button>
      <van-button type="primary" color="#00AEFF" @click="buyNow">立即兑换</van-button>
    </div>
  </div>
</template>
<script>
import item from './item'
const getOrderDetailUrl = '/sysOrder/getOrderDetail'
const cancelOrderUrl = '/sysOrder/cancelOrder'
export default {
  components: {
    item
  },
  data () {
    return {
      orderId: '',
      userId: localStorage.getItem('userId'),
      type: 0,
      orderTime: '2019-11-26',
      orderCode: '432156321365413',
      // 订单状态(-1,取消,0：待支付，1：待发货，2：待收货，3：已完成)
      stateName: ['订单关闭', '待支付', '待发货', '待收货', '已完成'],
      lastTime: '29分59秒',
      count: 0,
      score: 0,
      itemData: [],
      orderData: []
    }
  },
  created () {
    this.orderId = this.$route.query.orderId || ''
    if (this.orderId === '') {
      this.$toast('缺少订单id')
      return
    }
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail () {
      this.$axios(
        {
          url: getOrderDetailUrl,
          method: 'post',
          params: {
            orderId: this.orderId,
            uid: this.userId
          }
        },
        res => {
          if (res.status === 10001) {
            this.orderData = res.data.info
            this.type = this.orderData[0].orderStatus
            this.orderTime = this.orderData[0].createTime
            this.orderCode = this.orderData[0].orderNo
            this.count = this.orderData[0].totalAmount
            this.score = this.orderData[0].totalPrice
          } else {
            this.$toast(res.msg)
          }
        }
      )
    },
    goBack () {
      this.$router.go(-1)
    },
    buyNow () {
      let order = []
      this.orderData.forEach(p => {
        p.goodsList.forEach(p1 => {
          order.push(p1)
        })
      })
      let orderString = JSON.stringify(order)
      localStorage.removeItem('order')
      localStorage.setItem('order', orderString)
      this.$router.push({
        path: '/YesOrder'
      })
    },
    closeOrder () {
      this.$dialog
        .confirm({
          title: '关闭订单',
          message: '请确定是否关闭订单'
        })
        .then(() => {
          this.$axios(
            {
              url: cancelOrderUrl,
              method: 'post',
              params: {
                uid: this.userId,
                orderId: this.orderId
              }
            },
            res => {
              if (res.status === 10001) {
                this.$toast('关闭成功')
                this.$router.push({
                  path: '/orderList'
                })
              } else {
                this.$toast('系统错误')
              }
            }
          )
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
  // /*iphone XR*/
  // @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  //   padding-bottom: 34px;
  // }
  // @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
  //   padding-bottom: 34px;
  // }
  // /*iphone XMAX*/
  // @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  //   padding-bottom: 34px;
  // }
  // /* iphone X/XS */
  // @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  //   padding-bottom: 34px;
  // }
  // height: 100vh;
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
  .order{
    padding: 0 10px;
  }
  .order:nth-of-type(2n){
    margin-top: 10px;
  }
  .shopTitle {
    padding-top: 15px;
    color: #333333;
    font-size: 15px;
    font-weight: 600;
  }
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
