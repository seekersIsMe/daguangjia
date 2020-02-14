<template>
  <div class="login">
    <div class="loginIcon">
      <span class="icon"></span>
    </div>
    <van-cell-group>
      <van-field
        v-model="telNum"
        clearable
        label="手机号："
        placeholder="请输入手机号"
        @blur="blur"
      />
      <van-field
        v-model="code"
        label="验证码："
        placeholder="请输入验证码"
        clearable
        center
      >
        <span slot="button" class="getCode" @click="getCode" v-if="time === 60">
          获取验证码
        </span>
        <span slot="button" class="getCode" v-else>
          {{ time }}s后重新获取
        </span>
      </van-field>
    </van-cell-group>
    <van-row>
      <van-col span="18" offset="3">
        <van-button @click="login" type="primary" color="#00aeff"
          >登录</van-button
        ></van-col
      >
    </van-row>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
const getCodeUrl = '/sysUser/getPhoneCode'
const sendLoginUrl = '/sysUser/userLogin'
export default {
  data () {
    return {
      telNum: '',
      code: '',
      openId: '',
      time: 60,
      telIsTrue: false,
      codeIsTrue: false,
      isCanGetCode: true
    }
  },
  created () {
    this.openId = this.$route.query.openId || localStorage.getItem('openId')
  },
  methods: {
    blur (val) {},
    getCode () {
      this.vailTel()
      if (!this.telIsTrue) {
        return
      }
      this.time = 59
      this.sec60()
      if (this.isCanGetCode) {
        this.$axios(
          {
            url: getCodeUrl,
            params: {
              userName: this.telNum
            },
            method: 'post'
          },
          res => {
            if (res.status !== 10001) {
              this.$toast('系统异常，请刷新页面重试')
            }
          }
        )
      }
    },
    login () {
      // 秘钥fecdd73d2b088d11dd31cd0fcc5eb76c
      // wx4ec269f34598e506
      // window.location.href =
      // 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd991d12dffbcb838&redirect_uri=http%3A%2F%2Fahuibenben.cross.echosite.cn%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      // wx.chooseImage({
      //   count: 1, // 默认9
      //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      //   success: function (res) {
      //     var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      //     console.log('图片地址', localIds)
      //   }
      // })
      this.vail()
      this.telIsTrue && this.codeIsTrue && this.sendLogin()
    },
    sendLogin () {
      this.$axios(
        {
          url: sendLoginUrl,
          params: {
            userName: this.telNum,
            code: this.code,
            openId: this.openId
          },
          method: 'post'
        },
        res => {
          if (res.status === 10001) {
            localStorage.setItem('isLogin', true)
            localStorage.setItem('userId', res.data.info.uid)
            localStorage.setItem('userTel', this.telNum)
            this.$router.push({
              path: '/index'
            })
          } else {
            this.$toast(res.msg)
          }
        }
      )
    },
    vail () {
      this.vailTel()
      this.telIsTrue && this.vailCode()
    },
    vailCode () {
      if (this.code === '') {
        this.$toast('请输入验证码')
        this.codeIsTrue = false
      } else {
        this.codeIsTrue = true
      }
    },
    vailTel () {
      if (this.telNum === '') {
        this.$toast('请输入手机号')
        this.telIsTrue = false
        return
      }
      if (/^1[3456789]\d{9}$/.test(this.telNum)) {
        this.telIsTrue = true
      } else {
        this.telIsTrue = false
        this.$toast('请正确输入手机号')
      }
    },
    sec60 () {
      if (this.time === 0) {
        this.isCanGetCode = true
        this.time = 60
      } else {
        setTimeout(() => {
          this.time--
          this.isCanGetCode = false
          this.sec60()
        }, 1000)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.loginIcon {
  height: rem(200);
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: inline-block;
    width: rem(50);
    height: rem(50);
    background: url(~@/assets/img/logo.png) no-repeat center center;
    background-size: 100% 100%;
  }
}
.getCode {
  color: red;
}
.van-button {
  width: 100%;
  font-size: rem(14);
  border-radius: rem(5);
  margin-top: rem(50);
}
</style>
