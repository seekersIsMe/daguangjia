<template>
  <div class="YesOrder">
    <div class="header bgW">
      <van-icon @click="goBack" name="arrow-left" />我的订单
    </div>
    <div class="address bgW">
      <p class="title">收件信息</p>
      <div class="msgBody">
        <div class="left">
          <p class="p1">
            <span class="name">{{ name }}</span>
            <span class="tel">{{ tel }}</span>
          </p>
          <p class="p2">
            <span>收获地址</span>
            <span class="address">{{ address }}</span>
          </p>
        </div>
        <van-icon name="arrow" @click="selectAddress" />
      </div>
      <div class="dash"></div>
    </div>
    <div class="proList bgW">
      <p class="title">商品清单</p>
      <item :itemData="proList" />
    </div>
    <div class="footer">
      <div>
        <p>
          <span>合计积分：</span>
          <span class="price">{{ sumScore }}</span>
        </p>
        <p>
          <span>微信支付：</span>
          <span class="price">{{ wxPay }}</span>
        </p>
      </div>
      <van-button type="primary" color="#00AEFF" @click="exchange">立即兑换</van-button>
    </div>
    <van-popup
      v-model="show"
      :overlay="false"
      position="right"
      :style="{ height: '100%',width: '100%' }"
    >
      <selectAddress @selectAddress="choiceAddress" @close="close" />
    </van-popup>
  </div>
</template>
<script>
import item from './item'
import selectAddress from '@/components/selectAddress'
const getDefaultAddressUrl = '/sysUser/getDefaultAddress'
const saveOrderUrl = '/sysOrder/saveOrder'
const getUserInfoUrl = '/sysUser/getInfo'
export default {
  components: {
    item,
    selectAddress
  },
  data () {
    return {
      userId: localStorage.getItem('userId'),
      name: '',
      tel: '',
      address: '',
      addressId: '',
      sumScore: 0,
      proList: [],
      isSelectAddress: false,
      show: false,
      integral: 0 // 剩余积分
    }
  },
  computed: {
    wxPay () {
      if (this.sumScore > this.integral) {
        return this.sumScore - this.integral
      } else {
        return 0
      }
    }
  },
  created () {
    let order = localStorage.getItem('order')
    if (order) {
      this.proList = JSON.parse(order)
    }
    this.getDefaultAddress()
    this.getUserInfo()
  },
  methods: {
    exchange () {
      let goods = this.proList.map(p => {
        return p.goodsId
      })
      let amount = this.proList.map(p => {
        return p.amount
      })
      let cartIds = this.proList.map(p => {
        return p.cartId
      })
      console.log(this.proList)
      this.$axios(
        {
          url: saveOrderUrl,
          method: 'post',
          params: {
            uid: this.userId,
            addressId: this.addressId,
            goods: goods.join(','),
            amount: amount.join(','),
            integral: this.wxPay === 0 ? this.sumScore : this.integral,
            wxPay: this.wxPay,
            cartIds: cartIds.join(',')
          }
        },
        res => {
          if (res.status === 10001) {
            // 调起微信支付
            if (res.data.info.wxPay !== 0) {

            }
          } else {
          }
        }
      )
    },
    getUserInfo () {
      this.$axios(
        {
          url: getUserInfoUrl,
          params: {
            uid: this.userId
          },
          method: 'post'
        },
        res => {
          if (res.status === 10001) {
            this.integral = res.data.info.interal.integral
          } else {
            this.$toast(res.msg)
          }
        }
      )
    },
    close () {
      this.show = false
    },
    choiceAddress (data) {
      this.name = data.nickName
      this.tel = data.phone
      this.addressId = data.id
      let areaList = ['北京市', '天津市', '上海市', '重庆市']
      if (areaList.includes(data.province)) {
        this.address = data.city + data.district + data.address
      } else {
        this.address = data.province + data.city + data.district + data.address
      }
    },
    selectAddress () {
      this.show = true
    },
    getDefaultAddress () {
      this.$axios(
        {
          url: getDefaultAddressUrl,
          method: 'post',
          params: {
            uid: this.userId
          }
        },
        res => {
          if (res.status === 10001) {
            let data = res.data.info[0]
            this.name = data.nickName
            this.tel = data.phone
            this.addressId = data.id
            let areaList = ['北京市', '天津市', '上海市', '重庆市']
            if (areaList.includes(data.province)) {
              this.address = data.city + data.district + data.address
            } else {
              this.address =
                data.province + data.city + data.district + data.address
            }
          } else {
            this.$toast(res.msg)
          }
        }
      )
    },
    goBack () {
      // console.log('路由', this.$router)
      this.$router.go(-1)
    }
    // lookOrder () {
    //   this.$router.push({
    //     path: '/orderDetail'
    //   })
    // }
  },
  watch: {
    proList: {
      handler () {
        this.sumScore = this.proList.reduce((a, b) => {
          return a + b.price * b.amount
        }, 0)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.bgW {
  background: white;
}
.YesOrder {
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
  .header {
    position: relative;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #000000;
    font-size: 18px;
    .van-icon {
      position: absolute;
      left: 15px;
      top: 11px;
    }
  }
  .address {
    padding: 10px;
    margin-top: 10px;
    position: relative;
    .dash {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: linear-gradient(
        to right,
        #ff6c6c,
        #ff6c6c 8px,
        transparent 8px,
        transparent 10px,
        #1989fa 10px,
        #1989fa 18px,
        transparent 18px,
        transparent 20px
      );
      background-size: 20px 100%;
    }
    .title {
      font-size: 15px;
      color: #000000;
      font-weight: 500;
    }
    .msgBody {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .p1 {
        color: #666666;
        font-size: 15px;
        line-height: 30px;
      }
      .p2 {
        color: #666666;
        font-size: 13px;
      }
    }
  }
  .proList {
    padding: 15px;
    margin-top: 10px;
  }
  .footer {
    p{
      line-height: 18px;
    }
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
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    font-size: 15px;
    color: #333333;
    height: 50px;
    box-sizing: border-box;
    .price {
      color: #ff0000;
      margin-left: 5px;
    }
    .van-button {
      border-radius: 5px;
      height: 38px;
      line-height: 38px;
    }
  }
}
</style>
