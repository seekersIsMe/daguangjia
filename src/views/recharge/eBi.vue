<template>
    <div class="oilCard">
        <van-tabs v-model="active">
          <van-tab title="e币充值">
            <div class="bgw mgb p15 mgt">
              <div class="newWrap">
                <myTitle :titleVal="'e币充值数额'" class="myTitle"></myTitle>
              </div>
              <div class="selectWrap">
                <div
                  v-for="value in 3"
                  :key="value"
                  @click="select(value)"
                  class="selectItem"
                  :class="{selectMark: value === selectIndex}">
                  {{denomination[value-1]}}
                </div>
                <div class="other selectItem" @click="showInput">
                  <input class="input1" ref='input' v-if='isShowInput' type="number" v-model="other" maxlength='12'>
                  <p v-else >其他面值e币</p>
                </div>
              </div>
            </div>
            <div class="bgw mgb p15">
              <div class="newWrap">
                <myTitle :titleVal="'支付选择'" class="myTitle"></myTitle>
              </div>
              <div class="way">
                <p>
                  微信支付
                </p>
                <p class="displayFlex">
                  <span>
                    {{other}}
                  </span>
                  <span>
                    <van-checkbox v-model="checked" checked-color="#E40D0D" disabled></van-checkbox>
                  </span>
                </p>
              </div>
              <van-button type="default" color='#00AEFF' @click="saveChargeOrder">确认充值</van-button>
            </div>
          </van-tab>
          <van-tab title="e币转让">
            <div class="bgw">
                <div class="bg">
              <div class="sumE">
                <div>
                  <P class="title">
                    当前e币总额
                  </P>
                  <p class="sumNum">
                    {{ sumNum }}
                  </p>
                </div>
              </div>
              <div class="expire">
                <div>
                  <P class="title">
                  即将到期的e币
                  </P>
                  <p class="expireNum">
                    {{ expireNum }}
                  </p>
                </div>
              </div>
            </div>
            <div class="change">
              <span>
                e币
              </span>
              <div class="inputWrap">
                <input class="input2" type="number" placeholder="请输入e币数量" v-model="changeNum">
              </div>
              <p class="changIcon"></p>
              <span>
                转让价
              </span>
              <span class="changeNum">
                {{changeNum}}
              </span>
              <span>
                元
              </span>
            </div>
            <van-button type="default" color='#00AEFF'>确认支付</van-button>
            </div>
          </van-tab>
      </van-tabs>
    </div>
</template>
<script>
import wx from 'weixin-js-sdk'
import myTitle from '@/components/myTitle'
const getWxConfigUrl = '/sysOrder/getWxConfig'
const saveChargeOrderUrl = '/sysUser/saveChargeOrder'
const getChargePayParamUrl = '/sysUser/getChargePayParam'
export default {
  components: {
    myTitle
  },
  data () {
    return {
      userId: localStorage.getItem('userId'),
      cardNum: '',
      cardNum1: '',
      money: '',
      active: 0,
      selectIndex: 0,
      denomination: ['50元', '100元', '200元'],
      yuan: [
        50, 100, 200
      ],
      other: '',
      isShowInput: false,
      checked: true,
      expireNum: 0,
      sumNum: 99999,
      changeNum: 0,
      orderNum: '',
      signData: {},
      signObj: {}
    }
  },
  methods: {
    saveChargeOrder () {
      if (!localStorage.getItem('isAuto')) {
        this.$router.push({
          path: '/index'
        })
        return
      }
      this.$axios({
        url: saveChargeOrderUrl,
        method: 'post',
        params: {
          uid: this.userId,
          amount: this.other
        }
      }, res => {
        if (res.status === 10001) {
          this.orderNum = res.data.info || ''
        }
      })
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
          timestamp: this.signData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: this.signData.nonceStr, // 支付签名随机串，不长于 32 位
          package: this.signData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: this.signData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: this.signData.sign, // 支付签名
          success: function (res) {
            this.$toast('支付成功')
            // 支付成功后的回调函数
          }
        })
      })
    },
    showInput () {
      this.other = ''
      this.isShowInput = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    select (index) {
      this.selectIndex = index
      this.isShowInput = false
      this.other = this.yuan[index - 1]
    }
  },
  watch: {
    other () {
      if (this.other > 50000) {
        this.other = 50000
        this.$toast('最多一次充值50000')
      }
    },
    changeNum () {
      if (this.sumNum < this.changeNum) {
        this.changeNum = this.sumNum
        this.$toast('最多可转换' + this.sumNum)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.oilCard{
  background: #f7f7f7;
}
.bgw{
  background: white;
}
.mgb{
  margin-bottom: 15px;
}
.p15{
  padding: 0 10px;
}
.mgt{
  margin-top: 10px;
}
.selectWrap{
  display: flex;
  flex-wrap: wrap;
 .selectItem{
   width: 30%;
   line-height: 40px;
   border: 1px solid #ccc;
   margin-left: 10px;
   margin-bottom: 10px;
   text-align: center;
   font-size: 14px;
   overflow: hidden;
   box-sizing: border-box;
   border-radius: 3px;
 }
 .selectMark{
  border-color: #E40D0D
}
}
.other{
  overflow: hidden;
  line-height: 40px;
  .input1{
    border: 0;
    display: inline-block;
    width: 100%;
    height: 24px;
    line-height: 24px;
    box-sizing: border-box;
    padding: 0 4px;
  }
}
.way{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #E40D0D;
  font-size: 14px;
  flex-wrap: nowrap;
  margin: 15px 0;
  p:first-child{
    width: 60px;
  }
}
.displayFlex{
  display: flex;
  align-items: center;
  overflow: hidden;
  span{
    margin-left: 10px;
  }
}
.van-button{
  width: 90%;
  margin-left: 5%;
}
.bg{
  height: 150px;
  display: flex;
  align-items: center;
  text-align: center;
  .title{
    font-size: 16px;
    // color: white;
  }
  .sumE,.expire{
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    div{
      flex: 1
    }
  }
  .expireNum,.sumNum{
    font-size: 20px;
    // color: white;
  }
}
.change{
  display: flex;
  align-items: center;
  padding: 0 5%;
  margin-bottom: 10px;
  font-size: 12px;
}
input{
    border: 0;
    display: inline-block;
    width: 100%;
    height: 24px;
    line-height: 24px;
    box-sizing: border-box;
}
.inputWrap{
  width: 80px;
  line-height: 40px;
  background: #f8f8f8;
  border-radius: 3px;
  padding: 0 4px;
  margin: 0 20px 0 10px;
  .input2{
    background: #f8f8f8;
    font-size: 12px;
  }
}
.changeNum{
  color: #E40D0D;
  font-size: 20px;
}
.changIcon{
  margin: 0 20px;
  width: 40px;
  height: 40px;
}
/deep/ .van-checkbox__icon--disabled .van-icon{
    background-color: #E40D0D;
    border-color: #E40D0D;
}
</style>
