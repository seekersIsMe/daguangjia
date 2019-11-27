<template>
  <div class="indexWrap">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
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
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img class="swipeImg" :src="image" />
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
        <div class="seckillWrap">
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
              <div class="img">{{ item.img }}</div>
              <div class="killText">秒杀价{{ item.price_ }}积分</div>
              <div class="originPrice">原价：{{ item.price }}积分</div>
            </van-col>
          </van-row>
        </div>
        <div class="newProduct">
          <div class="newWrap">
            <myTitle :titleVal="'新品精选'" class="myTitle"></myTitle>
          </div>
          <div class="itemWrap">
            <div v-for="(item, index) in itemCount" :key="index" class="item">
              <listItem :key="index" />
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
export default {
  components: {
    myTitle,
    btn,
    listItem
  },
  data() {
    return {
      address: '广州',
      searchVal: '',
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      time: 30 * 3600 * 1000,
      seckillTitle: '秒杀专区',
      seckillData: [
        {
          img: 1,
          price: '1千',
          price_: 500
        },
        {
          img: 2,
          price: '1万',
          price_: '5千'
        },
        {
          img: 3,
          price: '1千',
          price_: 500
        },
        {
          img: 4,
          price: '1千',
          price_: 500
        }
      ],
      error: false,
      loading: false,
      finished: false,
      itemCount: [1, 2, 3, 4, 5, 6]
    }
  },
  created() {
    // this.code()
  },
  methods: {
    // 超过一万，一千，十万
    changNum(val) {
      if (val > 1000 && val < 10000) {
        return (val / 1000).toFixed(2) + '千'
      }
      if (val > 10000 && val < 100000) {
        return Math.round(val / 100) / 100 + '万'
      }
      if (val > 100000 && val < 1000000) {
        return Math.round(val / 1000) / 100 + '十万万'
      }
    },
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    code() {
      let url =
        'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxd991d12dffbcb838&secret=92d933d92116b498f6dd51e10a240cda'
      // let a = https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
      // this.$store.commit('changeToken', null)
      // this.$store.commit('changeCode', this.getQueryString('code'))
      console.log(
        'url获取授权',
        url +
          '&code=' +
          this.getQueryString('code') +
          '&grant_type=authorization_code'
      )
      axios
        .get(
          url +
            '&code=' +
            this.getQueryString('code') +
            '&grant_type=authorization_code'
        )
        .then(res => {
          console.log('授权成功', res)
        })
    },
    onSearch(val) {
      console.log(val)
      this.$router.push({
        path: 'proList'
      })
    },
    scrollToEnd() {
      console.log('到达底部了')
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.itemCount.push(this.itemCount.length + 1)
        }
        this.loading = false
      }, 500)
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
