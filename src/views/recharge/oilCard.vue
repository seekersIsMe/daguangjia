<template>
    <div class="oilCard">
        <div class="selectCard bgw">
            <van-radio-group v-model="radio">
                <van-radio name="1">中石化</van-radio>
                <van-radio name="2">中石油</van-radio>
                <van-radio name="3">石化电子券</van-radio>
            </van-radio-group>
        </div>
        <div v-show='radio==1|| radio==2'>
          <van-field v-model="cardNum" type="digit" label="油卡号:"  placeholder="请输入卡号100011开头共19位的卡号" />
          <van-field v-model="cardNum1" type="digit" label="再次确认:" placeholder="请再次确认卡号" class="mb15"/>
          <van-field v-model="money" type="digit" label="充值金额:" placeholder="请输入100的倍数" class="mb15" />
          <van-button type="default" color='#00AEFF' class="mb15" @click="recharge">立即充值</van-button>
        </div>
        <div v-show='radio==3'>
           <van-field v-model="cardNum2" type="digit" label="充值账号:"  placeholder="请输入充值账号"  class="bgw mb15"/>
           <div class="bgw mb15">
             <p class="title">
              充值金额
            </p>
            <div class="selectWrap">
              <div
                v-for="value in 6"
                :key="value"
                @click="select(value)"
                class="selectItem"
                :class="{selectMark: value === selectIndex && !isFocue}">
                {{denomination[value-1]}}
              </div>
            </div>
             <van-field v-model="otherDenomination" @focus='focus' @input="input" type="digit" label="其他面额:"  placeholder="请输入其他面额"/>
           </div>
           <div class="saveTip">
             <van-button type="default" color='#00AEFF' class="mb15" @click="recharge">立即充值</van-button>
           </div>
        </div>
    </div>
</template>
<script>
const chargeSinopecTicketUrl = '/sysUser/chargeSinopecTicket'
export default {
  data () {
    return {
      cardNum: '',
      cardNum1: '',
      money: '',
      radio: 1,
      denomination: ['50元', '100元', '200元', '300元', '500元', '1000元'],
      selectIndex: 0,
      cardNum2: localStorage.getItem('userTel'),
      userId: localStorage.getItem('userId'),
      otherDenomination: '',
      denominationValue: [50, 100, 200, 300, 500, 1000],
      isFocue: false,
      parmaDenomination: 0
    }
  },
  methods: {
    select (index) {
      this.selectIndex = index
      this.otherDenomination = 0
      this.isFocue = false
      this.parmaDenomination = this.denominationValue[index - 1]
    },
    focus () {
      this.isFocue = true
    },
    input () {
      this.parmaDenomination = this.otherDenomination
    },
    recharge () {
      console.log(this.radio)
      if (this.radio == 3) {
        this.$axios({
          url: chargeSinopecTicketUrl,
          method: 'post',
          params: {
            amount: this.parmaDenomination,
            uid: this.userId
          }
        }, res => {
          if (res.status === 10001) {
            this.$toast('充值成功')
          } else {
            this.$toast('充值失败')
          }
        })
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
.selectCard{
  margin-bottom: 15px;
}
.mb15{
  margin-bottom: 15px;
}
.van-radio-group{
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
.van-button{
  width: 90%;
  margin-left: 5%;
}
.title{
  overflow: hidden;
  padding: 15px 0 10px 10px;
  font-size: 14px;
}
.selectWrap{
  display: flex;
 flex-wrap: wrap;
 justify-content: space-between;
 padding-right: 10px;
 .selectItem{
   width: 30%;
   line-height: 40px;
   border: 1px solid #ccc;
   margin-left: 10px;
   margin-bottom: 10px;
   text-align: center;
   font-size: 14px;
   border-radius: 3px;
 }
 .selectMark{
  border-color: #E40D0D
}
}
</style>
