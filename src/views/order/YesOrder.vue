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
import wx from 'weixin-js-sdk'
const getDefaultAddressUrl = '/sysUser/getDefaultAddress'
const saveOrderUrl = '/sysOrder/saveOrder'
const getUserInfoUrl = '/sysUser/getInfo'
const getWxConfigUrl = '/sysOrder/getWxConfig'
const getChargePayParamUrl = '/sysOrder/getWxPayParams'
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
      integral: 0, // 剩余积分
      signData: {},
      signObj: {},
      orderNum: '',
      isHasAddress: true

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
      if (!this.isHasAddress) {
        this.$toast('请选择收货地址')
        return
      }
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
            this.$toast('下单成功')
            this.orderNum = res.data.info.orderNo
            // 调起微信支付
            if (res.data.info.wxPay !== 0) {
              this.getChargePayParam()
            }
          } else {
          }
        }
      )
    },
    getChargePayParam () {
      this.$axios({
        url: getChargePayParamUrl,
        method: 'post',
        params: {
          orderNo: this.orderNum
        }
      }, res => {
        if (res.status === 10001) {
          this.signData = res.data.info
          this.getWXconfig()
        }
      })
    },
    getWXconfig () {
      this.$axios({
        url: getWxConfigUrl,
        params: {
          url: location.href
        },
        method: 'post'
      }, (res) => {
        if (res.status === 10001) {
          this.signObj = res.data.info
          this.initWXconfig()
        }
      })
    },
    initWXconfig () {
      let that = this
      console.log('签名信息', this.signObj)
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.signObj.appId, // 必填，公众号的唯一标识
        timestamp: this.signObj.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.signObj.nonceStr, // 必填，生成签名的随机串
        signature: this.signObj.sign, // 必填，签名
        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        console.log('初始化成功')
        // wx.checkJsApi({
        //   jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        //   success: function (res) {
        //     console.log('是否可用', res)
        //     // 以键值对的形式返回，可用的api值true，不可用为false
        //     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        //   }
        // })
        // wx.chooseImage({
        //   count: 1, // 默认9
        //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        //   success: function (res) {
        //     let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        //     console.log('照片id', localIds)
        //   }
        // })
        wx.chooseWXPay({
          timestamp: that.signData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: that.signData.nonceStr, // 支付签名随机串，不长于 32 位
          package: that.signData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: that.signData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: that.signData.sign, // 支付签名
          success: function (res) {
            that.$toast('支付成功')
            that.$router.push({
              path: '/index'
            })
            // 支付成功后的回调函数
          }
        })
      })
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
      this.isHasAddress = true
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
            if (res.data.info.length > 0) {
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
              this.$toast('请选择收货地址')
              this.isHasAddress = false
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
  // /*iphone XR*/
  // @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  //   height: calc(100vh - 34px);
  // }
  // @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
  //   height: calc(100vh - 34px);
  // }
  // /*iphone XMAX*/
  // @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  //   height: calc(100vh - 34px);
  // }
  // /* iphone X/XS */
  // @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  //   height: calc(100vh - 34px);
  // }
  // height: 100vh;
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
