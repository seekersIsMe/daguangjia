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
            <van-icon name="location-o" />
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
            <van-swipe-item v-for="(item, index) in images" :key="index">
              <img class="swipeImg" :src="'http://47.107.110.186:8084'+item.logoPath" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="addKong"></div>
      <div class="recommendWrap">
        <van-row type="flex" justify="space-between">
          <van-col>
            <div class="icon1"></div>
            <div>母婴用品</div>
          </van-col>
          <van-col>
            <div class="icon2"></div>
            <div>食品</div>
          </van-col>
          <van-col>
            <div class="icon3"></div>
            <div>护肤彩妆</div>
          </van-col>
          <van-col>
            <div class="icon4"></div>
            <div>数码电器</div>
          </van-col>
          <van-col>
            <div class="icon5"></div>
            <div>生活日用</div>
          </van-col>
        </van-row>
      </div>
      <div class="hotWrap">
        <div class="seckillWrap" v-if="seckillData.length > 0">
          <myTitle :titleVal="seckillTitle" class="myTitle">
            <template v-slot:right>
              <btn :myTitle="'剩余时间'">
                <template v-slot:right>
                  <van-count-down :time="time" />
                </template>
              </btn>
            </template>
          </myTitle>
          <van-row>
            <van-col
              span="6"
              gutter="10"
              v-for="(item, index) in seckillData"
              :key="index"
            >
              <div class="img">
                <img :src="'http://47.107.110.186:8084'+item.goodsLogo">
              </div>
              <div class="killText">秒杀价{{ item.priceSpike }}积分</div>
              <div class="originPrice">原价：{{ item.dailyPrice }}积分</div>
            </van-col>
          </van-row>
        </div>
        <div class="newProduct">
          <div class="newWrap">
            <myTitle :titleVal="'新品精选'" class="myTitle"></myTitle>
          </div>
          <div class="itemWrap">
            <div v-for="(item, index) in itemCount" :key="index" class="item">
              <listItem :itemData="item" @addCar="addCar(item)" />
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import axios from 'axios'
import myTitle from '@/components/myTitle'
import btn from '@/components/btn'
import listItem from '@/components/listItem'
const getImgsUrl = '/sysGoods/getBanner'
const getFlashSaleUrl = '/sysGoods/getFlashSale'
const getNewGoodsUrl = '/sysGoods/getNewGoods'
const addCartUrl = '/sysCart/addCart'
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
      code: '' // 授权code
    }
  },
  created () {
    // this.getQueryString().then(res => {
    //   this.getAccess_token()
    // }).catch(err => {
    //   this.getCode()
    // })
    this.getImgs()
    this.getFlashSale()
    this.getNewGoods()
  },
  methods: {
    getCode () {
      let isAuto = localStorage.getItem('isAuto')
      let autoTime = localStorage.getItem('autoTime')
      if (!isAuto) {
        // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ec269f34598e506&redirect_uri=http%3A%2F%2Fahuibenben.cross.echosite.cn%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd991d12dffbcb838&redirect_uri=http%3A%2F%2Fahuibenben.cross.echosite.cn%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      } else {
        if ((new Date().getTime() - Number(autoTime)) > 30 * 24 * 60 * 60 * 1000) {
          // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ec269f34598e506&redirect_uri=http%3A%2F%2Fahuibenben.cross.echosite.cn%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd991d12dffbcb838&redirect_uri=http%3A%2F%2Fahuibenben.cross.echosite.cn%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        }
      }
    },
    addCar (item) {
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
          // this.$toast('')
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
      }
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
    onSearch (val) {
      this.$router.push({
        path: 'proList',
        queryy: {
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
  .van-list {
    padding-bottom: 70px;
  }
  .bgBlue {
    height: rem(110);
    background: linear-gradient(#0078ff, #00aeff);
    background-size: 100% 100%;
    padding: 0 10px 0 10px;
  }
  .searchWrap {
    display: flex;
    justify-content: start;
    align-items: center;
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
  .addKong {
    height: rem(55);
    padding-bottom: 27px;
  }
  .swipeWrap {
    height: calc(200% - 108px);
    border-radius: rem(10);
    .van-swipe-item,
    .van-swipe,
    .swipeImg,
    .van-swipe__track {
      border-radius: rem(10);
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
      width: 45px;
      height: 45px;
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
    .seckillWrap {
      .myTitle {
        padding: 10px 0;
      }
      .img {
        width: 80px;
        height: 80px;
        margin: auto;
        img{
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
        display: flex;
        flex-wrap: wrap;
        .item:nth-of-type(2n) {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
