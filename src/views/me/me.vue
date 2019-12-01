<template>
  <div class="meWrap">
    <div class="header">
      <div class="title">
        <van-icon name="arrow-left" @click="goback" />
        <span class="f18">个人中心</span>
        <van-icon name="user-o" @click="gotoInfo" />
      </div>
      <div class="meInfo">
        <van-image
          class="aiv"
          round
          width="64px"
          height="64px"
          :src="info.logoPath"
          v-if="info.logoPath"
        />
        <span v-else class="defaultAiv"></span>
        <div class="info">
          <p class="name">{{ info.nickName }}</p>
          <p class="company">
            <span>{{ info.city }}</span>
            <span>{{ info.unitName }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="orderWrap">
      <div class="title" @click="gotoOrder()">我的订单</div>
      <div class="orderIcon">
        <van-row type="flex" justify="space-between">
          <van-col span="6" @click="gotoOrder(0)">
            <div class="icon1 icon">
              <div class="infoCount">
                {{ orderStatus.status0 > 99 ? '99+' : orderStatus.status0 }}
              </div>
            </div>
            <p>待支付</p>
          </van-col>
          <van-col span="6" @click="gotoOrder(1)">
            <div class="icon2 icon">
              <div class="infoCount">
                {{ orderStatus.status1 > 99 ? '99+' : orderStatus.status1 }}
              </div>
            </div>
            <p>待发货</p>
          </van-col>
          <van-col span="6" @click="gotoOrder(2)">
            <div class="icon3 icon">
              <div class="infoCount">
                {{ orderStatus.status2 > 99 ? '99+' : orderStatus.status2 }}
              </div>
            </div>
            <p>已发货</p>
          </van-col>
          <van-col span="6" @click="gotoOrder()">
            <div class="icon4 icon">
            </div>
            <p>全部</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="scoreWrap">
      <div class="title">我的积分</div>
      <div class="scoreIcon">
        <van-row type="flex" justify="space-between">
          <van-col span="8">
            <div class="icon">{{ interal.integral }}</div>
            <p>剩余积分</p>
          </van-col>
          <van-col span="8">
            <div class="icon">{{ interal.expired }}</div>
            <p>即将过期</p>
          </van-col>
          <van-col span="8" @click="getScoreDetail">
            <div class="icon icon1"></div>
            <p>明细</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="addressWrap">
      <van-cell title="我的地址" is-link @click="goAddressList" />
    </div>
    <div class="unbind">解绑手机号</div>
  </div>
</template>
<script>
const getUserInfoUrl = '/sysUser/getInfo'
export default {
  data () {
    return {
      userId: localStorage.getItem('userId'),
      info: {
        uid: '', // 用户id
        unitName: '', // 企业名称
        phone: '', // 手机号
        nickName: '', // 昵称
        logoPath: '', // 头像
        province: '', // 省
        city: '', // 市
        district: '', // 区
        provinceCode: 440000 // 省代码
      },
      orderStatus: {
        status0: 0, // 待支付数
        status1: 0, // 待发货数
        status2: 0 // 已发货数
      },
      interal: {
        expired: 0, // 即将过期积分，如果为0，则不需要显示过期那行
        integral: 0, // 剩余积分
        overTime: '' // 积分过期时间，如果没有过期的积分，这里的时间是空字符串
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
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
            let {interal, orderStatus, info} = res.data.info
            this.interal = interal
            this.orderStatus = orderStatus
            this.info = info
          } else {
            this.$toast(res.msg)
          }
        }
      )
    },
    goback () {
      this.$router.go(-1)
    },
    gotoInfo () {
      this.$router.push({
        path: '/info'
      })
    },
    getScoreDetail () {
      this.$router.push({
        path: '/scoreDetail',
        query: {
          expired: this.interal.expired,
          interal: this.interal.interal,
          overTime: this.interal.overTime
        }
      })
    },
    goAddressList () {
      this.$router.push({
        path: '/addressList'
      })
    },
    gotoOrder (index) {
      this.$router.push({
        path: '/orderList',
        query: {
          type: index
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.meWrap {
  background: #f7f7f7;
  height: calc(100vh - 70px);
  .header {
    height: 180px;
    background: #00aeff;
    position: relative;
    margin-bottom: 10px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      padding: 0 15px;
      font-size: 18px;
      line-height: 40px;
      .f18 {
        font-size: 18px;
        font-weight: 500;
      }
    }
    .meInfo {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      color: #333333;
      font-size: 15px;
      height: 90px;
      background: url(~@/assets/img/tuoyuan.png) no-repeat center center;
      background-size: 110% 100%;
      padding-bottom: 10px;
      .aiv {
        display: inline-block;
        transform: translateY(-32px);
      }
      .defaultAiv {
        display: inline-block;
        height: 64px;
        width: 64px;
        border-radius: 50%;
        transform: translateY(-32px);
        background: url(~@/assets/img/defaultAic.png) no-repeat center center;
        background-size: 100% 100%;
      }
      .info {
        transform: translateY(-20px);
      }
      .name {
        margin-bottom: 10px;
      }
    }
  }
  .scoreWrap {
    background: white;
    margin-bottom: 10px;
    .title {
      line-height: 40px;
      color: #000000;
      font-size: 18px;
      font-weight: 500;
      padding-left: 20px;
      border-bottom: 1px solid #dddddd;
    }
    .scoreIcon {
      padding: 15px 20px;
      text-align: center;
      p {
        font-size: 15px;
      }
      .icon {
        margin: auto;
        color: #00aeff;
        font-size: 18px;
        height: 28px;
        line-height: 28px;
        margin-bottom: 10px;
      }
      .icon1 {
        width: 25px;
        height: 28px;
        background: url(~@/assets/img/me/mingxi.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
  .orderWrap {
    background: white;
    margin-bottom: 10px;
    .title {
      line-height: 40px;
      color: #000000;
      font-size: 18px;
      font-weight: 500;
      padding-left: 20px;
      border-bottom: 1px solid #dddddd;
    }
    .orderIcon {
      padding: 15px 20px;
      text-align: center;
      p {
        margin-top: 4px;
        font-size: 15px;
      }
      .icon {
        margin: auto;
        position: relative;
        .infoCount {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ff0000;
          color: white;
          font-size: 10px;
          text-align: center;
          line-height: 20px;
          right: -10px;
          top: -10px;
        }
      }
      .icon1 {
        width: 44px;
        height: 40px;
        background: url(~@/assets/img/me/icon1.png) no-repeat center center;
        background-size: 100% 100%;
      }
      .icon2 {
        width: 44px;
        height: 40px;
        background: url(~@/assets/img/me/icon2.png) no-repeat center center;
        background-size: 100% 100%;
      }
      .icon3 {
        width: 45px;
        height: 40px;
        background: url(~@/assets/img/me/icon3.png) no-repeat center center;
        background-size: 100% 100%;
      }
      .icon4 {
        width: 37px;
        height: 40px;
        background: url(~@/assets/img/me/icon4.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
  .addressWrap {
    margin-bottom: 10px;
    .van-cell {
      color: #000000;
      font-size: 18px;
      font-weight: 500;
      padding: 0 20px;
      line-height: 40px;
      align-items: center;
    }
  }
  .unbind {
    color: #ff0000;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    background: white;
  }
}
</style>
