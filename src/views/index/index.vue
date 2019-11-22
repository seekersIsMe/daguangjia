<template>
  <div class="indexWrap">
    <div class="bgBlue">
      <div class="searchWrap">
        <div class="addressWrap">
          <van-icon name="location-o" />
          <span>
            {{ address }}
          </span>
        </div>
        <div class="search">
          <van-search
            v-model="searchVal"
            placeholder="搜索商品名称"
            clearable
            shape="round"
            @search="onSearch"
          />
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
    <div class="recommendWrap"></div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      address: '广州',
      searchVal: '',
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  created () {
    this.code()
  },
  methods: {
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    code () {
      let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxd991d12dffbcb838&secret=92d933d92116b498f6dd51e10a240cda'
      // let a = https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
      // this.$store.commit('changeToken', null)
      // this.$store.commit('changeCode', this.getQueryString('code'))
      console.log('url获取授权', url + '&code=' + this.getQueryString('code') + '&grant_type=authorization_code')
      axios
        .get(url + '&code=' + this.getQueryString('code') + '&grant_type=authorization_code')
        .then(res => {
          console.log('授权成功', res)
        })
    },
    onSearch (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.indexWrap {
  .bgBlue {
    height: rem(110);
    background: linear-gradient(#00aeff, #61c7f7);
    background-size: 100% 100%;
    padding: 0 rem(10);
  }
  .searchWrap {
    display: flex;
    justify-content: start;
    align-items: center;
    .addressWrap {
      width: rem(40);
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .search {
      flex: 1;
      /deep/ .van-search {
        background: transparent !important;
      }
    }
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
}
</style>
