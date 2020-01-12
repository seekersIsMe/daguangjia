<template>
  <div class="infoWrap">
    <div class="header bgW"><van-icon @click="goBack" name="arrow-left" />个人中心</div>
    <div class="aiv item">
      <van-cell title="头像">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <div slot="right-icon" class="right" @click="selectPic">
          <img class="img" :src="imgSrc" alt="" />
          <!-- <van-icon name="arrow" /> -->
        </div>
      </van-cell>
    </div>
    <div class="item nickname">
      <!-- <van-cell title="昵称" is-link>
        <van-field
          slot="right-icon"
          v-model="nickname"
          placeholder="请输入用户名"
        />
      </van-cell> -->
      <van-cell title="昵称" :value="nickname" />
    </div>
    <div class="item telNum">
      <van-cell title="手机号" :value="telNum" />
    </div>
    <div class="item address">
      <van-cell title="所属地区" :value="address" is-link @click="selectArea" />
    </div>
    <div class="item company">
      <van-cell title="企业名称" :value="company" />
    </div>
    <!-- <van-row>
      <van-col span="18" offset="3">
        <van-button class="w100" type="primary" color="#00AEFF" @click="save"
          >保存</van-button
        >
      </van-col>
    </van-row> -->
    <van-area
      :area-list="areaList"
      :value="provinceCode"
      title="选择地址"
      v-show="isShowArea"
      @confirm="select"
      @cancel="cancelArea"
    />
    <!-- 拍照选择图片 -->
    <van-overlay :show="isShowPic" @click="isShowPic = false">
      <div class="picWrap" @click.stop>
        <div class="bodyPic">
          <van-button type="default" @click="gotoAlbum">
            <div class="btnWrap">
              <span class="pic1"></span>
              <span>
                相册
              </span>
            </div>
          </van-button>
          <van-button type="default" @click="takePic">
             <div class="btnWrap">
              <span class="pic2"></span>
              <span>
                拍照
              </span>
            </div>
          </van-button>
        </div>
        <div class="cancelPic" @click="cancel">
          <van-button type="default">取消</van-button>
        </div>
      </div>
    </van-overlay>
    <van-popup v-model="isCropper">
        <vueCropper
            ref="cropperPic"
            :img="imgUrl"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
          ></vueCropper>
      <van-button type="primary" @click="cropperPic">确定</van-button>
      <van-button type="primary" @click="noCropperPic">取消</van-button>
    </van-popup>
  </div>
</template>
<script>
import areaList from '@/assets/json/area.js'
import wx from 'weixin-js-sdk'
import vueCropper from 'vue-cropper'
const getOpenIdUrl = '/sysUser/getOpenId'
const getWxConfigUrl = '/sysOrder/getWxConfig'
const saveInfoUrl = '/sysUser/saveInfo'
const getUserInfoUrl = '/sysUser/getInfo'
export default {
  components: {
    vueCropper
  },
  data () {
    return {
      nickname: '',
      telNum: '',
      address: '',
      company: '',
      imgSrc: '',
      areaList: Object.freeze(areaList),
      isShowArea: false,
      isShowPic: false,
      code: '',
      userId: localStorage.getItem('userId'),
      provinceCode: '',
      isCropper: false,
      imgUrl: '',
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [5, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
    }
  },
  created () {
    // this.getAuto()
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
            let {info} = res.data.info
            this.info = info
            this.provinceCode = info.provinceCode
            this.address = info.province + info.city
            this.telNum = info.phone
            this.nickname = info.nickName
            this.company = info.unitName
            this.imgSrc = 'http://47.107.110.186:8082/' + info.logoPath
            // this.info.logoPath = 'http://47.107.110.186:8082/' + this.info.logoPath
          } else {
            this.$toast(res.msg)
          }
        }
      )
    },
    cancel () {
      this.isShowPic = false
    },
    getAuto () {
      if (!localStorage.getItem('isAuto')) {
        this.getQueryString().then(res => {
          this.getAccess_token()
        }).catch(() => {
          this.getCode()
        })
      }
    },
    getCode () {
      let isAuto = localStorage.getItem('isAuto')
      let autoTime = localStorage.getItem('autoTime')
      if (!isAuto) {
        // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ec269f34598e506&redirect_uri=http%3A%2F%2Fahuibenben.cross.echosite.cn%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ec269f34598e506&redirect_uri=http%3A%2F%2Fxdgj.gzdaguanjia.com%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd991d12dffbcb838&redirect_uri=http%3A%2F%2Fahuibenben.cross.echosite.cn%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      } else {
        if ((new Date().getTime() - Number(autoTime)) > 30 * 24 * 60 * 60 * 1000) {
          // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ec269f34598e506&redirect_uri=http%3A%2F%2Fahuibenben.cross.echosite.cn%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
          // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ec269f34598e506&redirect_uri=http%3A%2F%2Fxdgj.gzdaguanjia.com%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd991d12dffbcb838&redirect_uri=http%3A%2F%2Fahuibenben.cross.echosite.cn%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        }
      }
    },
    getQueryString () {
      return new Promise((resolve, reject) => {
        var reg = new RegExp('(^|&)' + 'code' + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) {
          this.code = unescape(r[2])
          localStorage.setItem('isAuto', 1)
          localStorage.setItem('autoTime', new Date().getTime())
          resolve()
        } else {
          reject()
        }
      })
    },
    getAccess_token () {
      // let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxd991d12dffbcb838&secret=19db5681405637649e2993678f7fc591'
      // let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx4ec269f34598e506&secret=fecdd73d2b088d11dd31cd0fcc5eb76c'
      if (!this.code) {
        return
      }
      this.$axios({
        url: getOpenIdUrl,
        method: 'post',
        params: {
          code: this.code
        }
      }, res => {
        if (res.status === 10001) {
        } else {
          this.$toast('openId获取失败')
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
        jsApiList: ['chooseImage', 'uploadImage', 'getLocalImgData'] // 必填，需要使用的JS接口列表
      })
    },
    cropperPic () {
      debugger
      this.$refs.cropperPic.getCropData(data => {
        debugger
        this.imgSrc = data
      })
    },
    noCropperPic () {},
    selectArea () {
      return
      if (this.isShowArea) {

      }
      this.isShowArea = true
    },
    cancelArea () {
      this.isShowArea = false
    },
    select (val) {
      // let areaList = ['北京市', '天津市', '上海市', '重庆市']
      let areaListCode = ['110000', '120000', '310000', '500000']
      // 北京市，天津市，上海市，重庆市，
      this.isShowArea = false
      this.address = val
        .reduce((a, b) => {
          if (!areaListCode.includes(b.code)) {
            a.push(b.name)
          }
          return a
        }, [])
        .join('')
    },
    save () {
      this.$axios({
        url: saveInfoUrl,
        method: 'post',
        params: {
          id: this.userId,
          nickName: this.nickname,
          logoPath: this.logoPath

        }
      }, res => {

      })
    },
    // 暂时不做
    selectPic () {
      return
      this.isShowPic = true
    },
    // 从本机中选图片
    gotoAlbum () {
      this.getAuto()
      if (localStorage.getItem('isAuto')) {
        this.getWXconfig()
        wx.ready(function () {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              console.log('照片id', localIds)
            }
          })
        })
      }
    },
    // 拍照
    takePic () {
      this.getAuto()
      let that = this
      if (localStorage.getItem('isAuto')) {
        this.getWXconfig()
        wx.ready(function () {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              console.log('照片id', res)
              wx.uploadImage({
                localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                  var serverId = res.serverId // 返回图片的服务器端ID
                  console.log('服务器id', res)
                }
              })
              wx.getLocalImgData({
                localId: localIds[0], // 图片的localID
                success: function (res) {
                  var localData = res.localData // localData是图片的base64数据，可以用img标签显示
                  that.imgSrc = localData
                  that.imgUrl = localData
                  that.isCropper = true
                }
              })
            }
          })
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.infoWrap {
  height: 100vh;
  overflow: hidden;
  background: #f7f7f7;
  position: relative;
  .bgW{
    background: white;
  }
  .header {
  position: relative;
  text-align: center;
  height: 40px;
  line-height: 40px;
  .van-icon {
    position: absolute;
    top: 11px;
    left: 10px;
  }
}
  .item {
    margin-top: 10px;
  }
  .van-cell {
    /deep/ .van-cell__title {
      color: #333333;
      font-size: 16px;
    }
    /deep/ .van-cell__value {
      color: #666666;
      font-size: 15px;
    }
  }
  .aiv {
    .img {
      display: inline-block;
      width: 47px;
      height: 47px;
    }
    .van-cell {
      height: 65px;
      /deep/ .van-cell__title {
        display: flex;
        align-items: center;
        color: #333333;
        font-size: 16px;
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
  }
  .nickname {
    .van-cell.van-field {
      flex: 1;
      padding: 0;
      text-align: right;
      /deep/ input {
        text-align: right;
        text-align: end;
      }
    }
  }
  .van-picker {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .w100 {
    width: 100%;
    border-radius: 5px;
    margin-top: 30px;
  }
}
.picWrap {
  height: 100%;
  position: relative;
  .van-button {
    width: 100%;
  }
  .bodyPic {
    position: absolute;
    bottom: 90px;
    left: 12px;
    right: 12px;
    background: white;
    border-radius: 5px;
  }
  .cancelPic {
    position: absolute;
    bottom: 30px;
    left: 12px;
    right: 12px;
  }
  .btnWrap{
    color: #00AEFF;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    .pic1,.pic2{
      display: inline-block;
      width: 25px;
      height: 20px;
      margin-right: 4px;
    }
    .pic1{
      background: url(~@/assets/img/me/pic1.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .pic2{
      background: url(~@/assets/img/me/pic2.png) no-repeat center center;
      background-size: 100% 100%;
    }
  }
}
.cancelPic{
  .van-button{
    border-radius: 5px;
  }
}
.company{
  /deep/ .van-cell__value{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  }
}
</style>
