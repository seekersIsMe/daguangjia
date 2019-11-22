<template>
  <div class="login">
    <div class="loginIcon">
      <span class="login"></span>
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
        <span slot="button" class="getCode" @click="getCode" v-if='time === 60'>
          获取验证码
        </span>
        <span
        slot="button"
        class="getCode"
        v-else
        >
        {{ time }}s后重新获取
        </span>
      </van-field>
    </van-cell-group>
    <van-row>
      <van-col span="18" offset="3">
        <van-button
          @click="login"
          type="primary"
          color="#00aeff"
        >登录</van-button></van-col>
    </van-row>
  </div>
</template>
<script>
import { getCode } from '@/api/index/index'
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      telNum: '',
      code: '',
      time: 60,
      telIsTrue: false,
      codeIsTrue: false
    }
  },
  methods: {
    blur (val) {
    },
    getCode () {
      this.time = 59
      this.sec60()
      if (this.time === 0) {
        // getCode().then(res => {
        // })
      }
    },
    login () {
      console.log('微信', wx)
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5410a6f99a36e39f&redirect_uri=http%3A%2F%2F350bcf1a.nat123.cc%3A28312%2F%23%2Findex&response_type=code&scope=&state=123#wechat_redirect'
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5410a6f99a36e39f&redirect_uri=http%3A%2F%2F350bcf1a.nat123.cc%3A28312%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
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
    },
    vail () {
      this.vailTel()
      this.telIsTrue && this.vailCode()
    },
    vailCode () {
      if (this.code === '') {
        this.$toast('请输入验证码')
        this.codeIsTrue = false
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
        this.time = 60
      } else {
        setTimeout(() => {
          this.time--
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
    background: #00aeff;
  }
}
.getCode {
  color: red;
}
.van-button{
  width: 100%;
  font-size: rem(14);
  border-radius: rem(5);
  margin-top: rem(50)
}
</style>
