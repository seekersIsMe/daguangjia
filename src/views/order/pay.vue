<template>
  <div class="payWrap">
    <div class="header bgW">
      <van-icon @click="goBack" name="arrow-left" />我的订单
    </div>
    <div class="body">
      <div class="success" v-if="isSucc">
        <div class="bgIcon"></div>
        <p>
          订单支付成功
        </p>
      </div>
      <div class="fail" v-else>
        <div class="bgIcon"></div>
        <p>
          支付失败
        </p>
      </div>
    </div>
    <div class="btn">
      <van-button type="primary" color="#00AEFF" @click="lookOrder">查看订单</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isSucc: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    lookOrder () {
      this.$router.push({
        path: '/orderDetail'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.payWrap{
  
   background: #f7f7f7;
   height: 100vh;
   .header{
     position: relative;
     height: 40px;
     line-height: 40px;
     text-align: center;
     color: #000000;
     font-size: 18px;
     background: white;
     .van-icon{
       position: absolute;
       left: 15px;
       top: 11px;
     }
   }
   .body{
     margin-top: 35px;
     .success,.fail{
       color: #333333;
       font-size: 18px;
       text-align: center;
       .bgIcon{
         width: 35vw;
        height: 35vw;
        margin: 0 auto;
       }
       p{
         margin-top: 20px;
       }
     }
     .success{
       .bgIcon{
         background: url(~@/assets/img/paySuc.png) no-repeat center center;
         background-size: 100% 100%;
       }
     }
     .fail{
       .bgIcon{
         background: url(~@/assets/img/payFail.png) no-repeat center center;
         background-size: 100% 100%;
       }
     }
   }
   .btn{
     padding: 20px;
     .van-button{
       width: 100%;
       height: 45px;
       border-radius: 5px;
       color: white;
       font-size: 18px;
     }
   }
}
</style>
