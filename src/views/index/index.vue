<template>
  <div class="indexWrap">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="scrollToEnd"
    >
      <div class="bgBlue">
        <div class="searchWrap">
          <div class="addressWrap">
            <van-icon name="location-o" @click="getWXconfig"/>
            <span>{{ address }}</span>
          </div>
          <div class="search">
            <form action="/">
              <van-search
                v-model="searchVal"
                placeholder="搜索商品名称"
                clearable
                shape="round"
                @search="onSearch"
              >
              </van-search>
            </form>
          </div>
        </div>
        <div class="swipeWrap">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(item, index) in images" :key="index" @click="goProList(item)">
              <img class="swipeImg" :src="'http://47.107.110.186:8082'+item.logoPath" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="recommendWrap">
        <van-row type="flex" justify="space-between">
          <van-col v-for='(item, index) in categoryList' :key="index" @click="goType(item,index)">
            <div :class="'icon'+ (index + 1)">
              <!-- <img :src="item.logo" alt=""> -->
            </div>
            <div>{{item.categoryName}}</div>
          </van-col>
        </van-row>
      </div>
      <div class="noticeBar" v-show='hotData.length > 0'>
        <div class="hotText">
         <van-icon name="fire" /> 热点
        </div>
        <van-swipe :autoplay="3000"  vertical :height="30">
          <van-swipe-item v-for="(item, index) in hotData" :key="index">
            <div class="text">
            {{ item.title }}
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="hotWrap">
        <div class="seckillWrap" v-if="seckillData.length > 0 && time > 0">
          <myTitle :titleVal="seckillTitle" class="myTitle">
            <template v-slot:right>
              <btn :myTitle="'剩余时间'">
                <template v-slot:right>
                  <van-count-down :time="time" />
                </template>
              </btn>
            </template>
          </myTitle>
          <swiper :options="swiperOption">
            <swiper-slide
              v-for="(item, index) in seckillData"
              :key="index"
              class="flex1">
              <div @click="goToDetail(item)">
                <div class="img">
                  <img :src="'http://47.107.110.186:8082'+item.goodsLogo">
                </div>
                <div class="killText">秒杀价￥{{ item.priceSpike }}</div>
                <div class="originPrice">原价￥{{ item.dailyPrice }}</div>
            </div>
            </swiper-slide>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
           <!-- <van-swipe :width="90" :show-indicators='false'>
            <van-swipe-item
              v-for="(item, index) in seckillData"
              :key="index"
              @click="goToDetail(item)"
              class="flex1">
              <div>
                <div class="img">
                  <img :src="'http://47.107.110.186:8082'+item.goodsLogo">
                </div>
                <div class="killText">秒杀价{{ item.priceSpike }}</div>
                <div class="originPrice">原价：{{ item.dailyPrice }}</div>
            </div>
            </van-swipe-item>
          </van-swipe> -->
        </div>
        <div class="newProduct">
          <div class="newWrap">
            <myTitle :titleVal="'新品精选'" class="myTitle"></myTitle>
          </div>
          <div class="itemWrap">
            <van-grid :gutter="5" :column-num="3">
              <van-grid-item
                v-for="(item, index) in itemCount" :key="index" class="item"
              >
               <listItem :itemData="item" @addCar="addCar(item)" />
              </van-grid-item>
            </van-grid>
            <!-- <div v-for="(item, index) in itemCount" :key="index" class="item">
              <listItem :itemData="item" @addCar="addCar(item)" />
            </div> -->
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import myTitle from '@/components/myTitle'
import btn from '@/components/btn'
import listItem from '@/components/listItem1'
import wx from 'weixin-js-sdk'
const getImgsUrl = '/sysGoods/getBanner'
const getFlashSaleUrl = '/sysGoods/getFlashSale'
const getNewGoodsUrl = '/sysGoods/getNewGoods'
const addCartUrl = '/sysCart/addCart'
const getOpenIdUrl = '/sysUser/getOpenId'
const getIndexCategoryUrl = '/sysGoods/getIndexCategory'
const getWxConfigUrl = '/sysOrder/getWxConfig'
const getHotUrl = '/sysGoods/getHot'
export default {
  name: 'index',
  components: {
    myTitle,
    btn,
    listItem
  },
  data () {
    return {
      address: '广州',
      searchVal: '',
      images: [],
      time: 0,
      seckillTitle: '秒杀专区',
      seckillData: [],
      page: 1,
      error: false,
      loading: false,
      finished: false,
      itemCount: [],
      userId: localStorage.getItem('userId'),
      code: '', // 授权code
      categoryList: [
        {
          categoryName: '汽车用品'
        },
        {
          categoryName: '医疗保健'
        },
        {
          categoryName: '跨境购'
        },
        {
          categoryName: '食品酒水'
        },
        {
          categoryName: '充值中心'
        }
      ],
      hotData: [],
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 10,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  created () {
    if (!localStorage.getItem('isAuto')) {
      this.getQueryString().then(res => {
        this.getAccess_token()
      }).catch(() => {
        this.getCode()
      })
    } else {
      if (!localStorage.getItem('isLogin')) {
        var reg = new RegExp('(^|&)' + 'code' + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) {
          this.code = unescape(r[2])
          this.getAccess_token()
        }
      }
    }
    this.getImgs()
    this.getFlashSale()
    this.getNewGoods()
    this.getHot()
    // this.getIndexCategory()
  },
  methods: {
    getHot () {
      this.$axios({
        url: getHotUrl,
        method: 'post'
      }, res => {
        if (res.status === 10001) {
          this.hotData = res.data.info || []
        } else {
          this.$toast(res.msg)
        }
      })
    },
    goProList (item) {
      this.$router.push({
        path: 'proList',
        query: {
          subCategoryId: item.subCategoryId
        }
      })
    },
    goToDetail (item) {
      this.$router.push({
        path: '/proDetail',
        query: {
          id: item.id
        }
      })
    },
    goType (item, index) {
      if (index < 4) {
        // this.$router.push({
        //   path: 'proList',
        //   query: {
        //     subCategoryId: item.id
        //   }
        // })
      } else {
        if (!localStorage.getItem('isLogin')) {
          this.$router.push({
            path: '/login'
          })
        } else {
          this.$router.push({
            path: 'rechargeIndex'
          })
        }
      }
    },
    getIndexCategory () {
      this.$axios({
        url: getIndexCategoryUrl,
        method: 'post'
      }, res => {
        if (res.status === 10001) {
          res.data.info && res.data.info.forEach(p => {
            p.logo = 'http://47.107.110.186:8082' + p.logo
          })
          this.categoryList = res.data.info || []
        } else {
          this.$toast(res.msg)
        }
      })
    },
    getCode () {
      let isAuto = localStorage.getItem('isAuto')
      let autoTime = localStorage.getItem('autoTime')
      if (!isAuto) {
        // http%3A%2F%2Fdgj.baolianqiandai.com%2Findex
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ec269f34598e506&redirect_uri=http%3A%2F%2Fdgj.baolianqiandai.com%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd991d12dffbcb838&redirect_uri=http%3A%2F%2Fahuibenben.cross.echosite.cn%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      } else {
        if ((new Date().getTime() - Number(autoTime)) > 30 * 24 * 60 * 60 * 1000) {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ec269f34598e506&redirect_uri=http%3A%2F%2Fdgj.baolianqiandai.com%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
          // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd991d12dffbcb838&redirect_uri=http%3A%2F%2Fahuibenben.cross.echosite.cn%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        }
      }
    },
    addCar (item) {
      console.log(localStorage.getItem('userId'))
      this.$axios({
        url: addCartUrl,
        method: 'post',
        params: {
          uid: this.userId,
          goodsId: item.id,
          goodsType: 1
        }
      }, res => {
        if (res.status === 10001) {
          this.$toast('添加成功')
        } else {
          this.$toast(res.msg)
        }
      })
    },
    getImgs () {
      this.$axios({
        url: getImgsUrl,
        method: 'post'
      }, res => {
        if (res.status === 10001) {
          this.images = res.data.info || []
        } else {
          this.$toast(res.msg)
        }
      })
    },
    getFlashSale () {
      this.$axios({
        url: getFlashSaleUrl,
        method: 'post'
      }, res => {
        if (res.status === 10001) {
          this.seckillData = res.data.info || []
          this.time = res.data.time && (res.data.time - new Date().getTime() || 0)
        } else {
          this.$toast(res.msg)
        }
      })
    },
    getNewGoods () {
      this.$axios({
        url: getNewGoodsUrl,
        method: 'post',
        params: {
          page: this.page,
          brandId: '',
          goodsName: this.searchVal
        }
      }, res => {
        if (res.status === 10001) {
          this.itemCount = [...this.itemCount, ...res.data.info]
          this.loading = false
          if (res.data.info && res.data.info.length < 10) {
            this.finished = true
          }
        } else {
          this.$toast(res.msg)
        }
      })
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
          console.log('openID', res)
          if (!localStorage.getItem('isLogin')) {
            localStorage.setItem('openId', res.data.info)
            this.$router.push({
              path: '/login',
              query: {
                openId: res.data.info
              }
            })
          }
        } else {
          this.$toast('openId获取失败')
        }
      })
      // url = url + '&code=' + this.code + '&grant_type=authorization_code'
      // this.$jsonp('https://api.weixin.qq.com/sns/oauth2/access_token', {
      //   appid: 'wxd991d12dffbcb838',
      //   secret: '19db5681405637649e2993678f7fc591',
      //   code: this.code,
      //   grant_type: 'authorization_code',
      //   callback: ''
      // }).then(res => {
      //   console.log('token', res)
      // }).catch(err => {
      //   // console.log(err)
      // })
      // axios.get(url)
      //   .then(res => {
      //     console.log('授权成功', res)
      //   })
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
        jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
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
      })
    },
    onSearch (val) {
      this.$router.push({
        path: 'proList',
        query: {
          goodsName: val
        }
      })
    },
    scrollToEnd () {
      !this.finished && this.page++
      !this.finished && this.getNewGoods()
    }
  }
}
</script>
<style lang="scss" scoped>
.indexWrap {
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
  // box-sizing: border-box;
  // overflow-y: auto;
  .van-list {
    padding-bottom: 70px;
  }
  .bgBlue {
    position: relative;
    // background: linear-gradient(#0078ff, #00aeff);
    // background-size: 100% 100%;
    // padding: 0 10px 0 10px;
  }
  .searchWrap {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 10px;
    .addressWrap {
      font-size: 14px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        margin-left: 5px;
      }
    }
    .search {
      flex: 1;
      /deep/ .van-search {
        background: transparent !important;
      }
    }
  }
  .swipeWrap {
    height: 43.5vw;
    .van-swipe-item,
    .van-swipe,
    .swipeImg,
    .van-swipe__track {
    }
    .van-swipe {
      height: 100%;
    }
    .swipeImg {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
  }
  .recommendWrap {
    padding: 10px;
    font-size: 12px;
    .van-col {
      flex: 1;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .icon1,
    .icon2,
    .icon3,
    .icon4,
    .icon5 {
      width: 60%;
      padding-bottom: 60%;
      // height: 45px;
      margin-bottom: 5px;
    }
    .icon1 {
      background: url(~@/assets/img/index/icon1.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .icon2 {
      background: url(~@/assets/img/index/icon2.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .icon3 {
      background: url(~@/assets/img/index/icon3.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .icon4 {
      background: url(~@/assets/img/index/icon4.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .icon5 {
      background: url(~@/assets/img/index/icon5.png) no-repeat center center;
      background-size: 100% 100%;
    }
  }
  .hotWrap {
    background-color: #f7f7f7;
    padding: 0 10px;
    // /deep/ .van-swipe__indicators{
    //   display: none;
    // }
    .seckillWrap {
      .myTitle {
        padding: 10px 0;
      }
      .img {
        width: 90%;
        padding-top: 90%;
        height: 0;
        position: relative;
        margin: auto;
        margin-bottom: 10px;
        img{
          position: absolute;
          top: 0;
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .killText {
        color: #e40d0d;
        font-size: 12px;
        text-align: center;
      }
      .originPrice {
        font-size: 12px;
        color: #999999;
        text-decoration: line-through;
        text-align: center;
      }
    }
    .newProduct {
      .newWrap {
        padding: 10px 0;
      }
      .itemWrap {
        // display: flex;
        // flex-wrap: wrap;
        // overflow: hidden;
        // .item{
        //   margin-left: 10px;
        // }
        // .item:nth-of-type(3n+1) {
        //   margin-left: 0;
        // }
      }
    }
  }
}
.noticeBar{
  position: relative;
  margin-top: 5px;
  padding-bottom: 5px;
  .hotText{
    color: #e36209;
    margin-right: 10px;
    line-height: 30px;
    position: absolute;
    left: 10px;
    width: 65px;
    height: 30px;
    display: flex;
    align-items: center;
  }
  overflow: hidden;
  height: 30px;
  .van-swipe{
    padding-left:75px;
    position: relative;
  }
  .text{
    line-height: 30px;
    height: 30px;
  }
  /deep/ .van-swipe__indicators{
    display: none;
  }
}
</style>
