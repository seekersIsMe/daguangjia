<template>
  <div class="conversionWrap">
    <div class="scrollWrap">
      <div class="goBack" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <van-cell is-link @click="gotoRecharge" >
        <template slot="title">
    <span class="custom-title">使用e券积分卡充值</span>
    <van-icon name="question-o" />
  </template>
      </van-cell>
     <van-tabs v-model="active" @change='changeType'>
  <van-tab title="全部">
  </van-tab>
  <van-tab title="使用记录"></van-tab>
</van-tabs>
 <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="scrollToEnd"
    >
    <item
        v-for='(item,index) in itemData'
        :itemData = 'item'
        :key='index'
        :active='active'
        @use='use'
    />
      </van-list>
    </div>
  </div>
</template>
<script>
import item from './item'
const getJYBUrl = '/sysUser/getTicket'
const chargeTicketUrl = '/sysUser/chargeTicket'
export default {
  components: {
    item
  },
  data () {
    return {
      active: 0,
      loading: false,
      finished: false,
      itemData: [],
      page: 1,
      userId: localStorage.getItem('userId')
    }
  },
  created () {
    this.getJYB()
  },
  methods: {
    chargeTicket (params) {
      this.$axios({
        url: chargeTicketUrl,
        method: 'post',
        params: {
          ticketId: params.id,
          uid: this.userId,
          ticketNo: this.ticketNo
        }
      }, res => {
        if (res.status === 10001) {
          this.$toast('充值成功')
          this.getJYB()
        } else {
          this.$toast(res.msg)
        }
      })
    },
    use (item) {
      this.chargeTicket(item)
    },
    gotoRecharge () {
      this.$router.push({
        path: '/recharge'
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    changeType () {
      this.page = 1
      this.itemData = []
      this.getJYB()
    },
    getJYB () {
      this.$axios({
        url: getJYBUrl,
        method: 'post',
        params: {
          type: this.active,
          uid: this.userId
        }
      }, res => {
        if (res.status === 10001) {
          // this.itemData = [...this.itemData, ...res.data.info]
          this.itemData = res.data.info || []
          this.loading = false
          // if (res.data.info && res.data.info.length < 10) {
          //   this.finished = true
          // }
        } else {
          this.$toast(res.msg)
        }
      })
    },
    scrollToEnd () {
      // !this.finished && this.page++
      // !this.finished && this.getJYB()
    }
  }
}
</script>
<style lang="scss" scoped>
.conversionWrap {
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
  // background: url(~@/assets/img/bg.png) no-repeat center center;
  // background-size: 100% 100%;
  .scrollWrap {
    height: 100%;
    overflow: auto;
    position: relative;
  }
  .goBack {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    z-index: 10;
    font-size: 20px;
    padding: 10px;
    color: white;
  }
  .title {
    padding: 60px 0 0 10px;
    font-size: 18px;
    color: white;
    line-height: 40px;
  }
  .line {
    width: 80px;
    height: 2px;
    background: white;
    margin-left: 10px;
    margin-bottom: 30px;
  }
  .itemWrap {
    padding: 0 15px;
  }
  .van-list{
    padding: 10px;
  }
  .custom-title{
    padding-left: 10px;
    color: #FF0000;
    vertical-align: middle;
  }
  .van-icon-question-o{
    color: #FF0000;
    vertical-align: middle;
  }
}
</style>
