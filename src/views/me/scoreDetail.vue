<template>
  <div class="scoreDetailWrap">
    <div class="header">
       <div class="headerTitle">
        <van-icon name="arrow-left" @click="goBack" />收货地址
      </div>
      <div class="p1">
        <span class="scoreIcon"> </span>
        <span>
          我的积分:
        </span>
        <span>{{ myScore }}</span>
      </div>
      <div class="p2" v-if='pastDueScore > 0'>
        <span>
          {{ pastDueScore }}
        </span>
        <span>
          积分即将过期，有效期至
        </span>
        <span>
          {{ pastDueDate }}
        </span>
      </div>
    </div>
    <div class="scoreListWrap">
      <div class="scoreList">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :mmediate-check="false"
          @load="onLoad"
        >
          <div class="item" v-for="(item, index) in scoreList" :key="index">
            <div class="left">
              <p class="detail">
                {{ item.remark }}
              </p>
              <p class="date">
                {{ item.createTime }}
              </p>
            </div>
            <div class="right" :class="item.amount.includes('+') > 0 ? 'color' : 'color_'">
              {{ String(item.amount) }}
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
const getScoreListUrl = '/sysUser/getEcoinList'
export default {
  data () {
    return {
      finished: false,
      loading: false,
      myScore: 0,
      pastDueScore: 0,
      pastDueDate: '',
      page: 1,
      userId: localStorage.getItem('userId'),
      scoreList: []
    }
  },
  created () {
    this.myScore = this.$route.query.integral || 0
    this.pastDueScore = this.$route.query.expired || 0
    this.pastDueDate = this.$route.query.overTime || ''
    this.getScoreList()
  },
  methods: {
    getScoreList () {
      this.$axios({
        url: getScoreListUrl,
        method: 'post',
        params: {
          uid: this.userId,
          page: this.page
        }
      }, res => {
        if (res.status === 10001) {
          this.scoreList = [...this.scoreList, ...res.data.info]
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
    onLoad () {
      this.page++
      !this.finished && this.getScoreList()
    }
  }
}
</script>
<style lang="scss" scoped>
.scoreDetailWrap {
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
  position: relative;
  .headerTitle {
    position: relative;
    line-height: 40px;
    height: 40px;
    color: white;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 7vw;
    .van-icon {
      position: absolute;
      left: 15px;
      font-size: 18px;
      margin-top: 11px;
    }
  }
  .header {
    width: 100vw;
    height: 60vw;
    background: url(~@/assets/img/me/scoreBg.png) no-repeat center center;
    background-size: 100% 100%;
    // padding-top: 15vw;
    .p1 {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: white;
      margin-bottom: 12px;
      .scoreIcon {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url(~@/assets/img/me/scoreIcon.png) no-repeat center center;
        background-size: 100% 100%;
        margin-right: 4px;
      }
    }
    .p2 {
      text-align: center;
      font-size: 12px;
      color: white;
    }
  }
  .scoreListWrap {
    position: absolute;
    top: 40vw;
    left: 15px;
    right: 15px;
    bottom: 0;
    overflow-y: auto;
    background: white;
    border-radius: 5px;
    .title {
      display: flex;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #e1e1e1;
      span:nth-of-type(2) {
        margin-left: 20px;
      }
    }
    .scoreList {
      overflow-y: auto;
      .item {
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e1e1e1;
        .detail {
          font-size: 16px;
          color: #333333;
          line-height: 30px;
        }
        .date {
          font-size: 13px;
          color: #999999;
          line-height: 20px;
        }
        .right {
          font-size: 16px;
        }
        .color {
          color: #00aeff;
        }
        .color_ {
          color: #333333;
        }
      }
    }
  }
}
</style>
