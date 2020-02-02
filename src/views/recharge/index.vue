<template>
  <div class="indexWrap">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="scrollToEnd"
    >
     <div class="swipeWrap">
        <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in images" :key="index" @click="goProList(item)">
            <img class="swipeImg" :src="'http://47.107.110.186:8082'+item.logoPath" />
        </van-swipe-item>
        </van-swipe>
    </div>
    <div class="displayFlex">
        <div class="flex1" @click="gotoSub(1)">
             <span class="icon icon1">

            </span>
            <p>
                手机充值
            </p>
        </div>
        <div class="flex1" @click="gotoSub(2)">
            <span class="icon icon2">

            </span>
            <p>
                油卡充值
            </p>
        </div>
        <div class="flex1" @click="gotoSub(3)">
                <span class="icon icon3">

                </span>
                <p>
                    e币充值
                </p>
        </div>
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
    </van-list>
  </div>
</template>
<script>
import myTitle from '@/components/myTitle'
import listItem from '@/components/listItem'
const getImgsUrl = '/sysGoods/getBanner'
const getNewGoodsUrl = '/sysGoods/getNewGoods'
const addCartUrl = '/sysCart/addCart'
export default {
  components: {
    myTitle,
    listItem
  },
  data () {
    return {
      images: [],
      page: 1,
      error: false,
      loading: false,
      finished: false,
      itemCount: [],
      userId: localStorage.getItem('userId')
    }
  },
  created () {
    this.getImgs()
    this.getNewGoods()
  },
  methods: {
    gotoSub (index) {
      switch (index) {
        case 1:
          break
        case 2:
          this.$router.push({
            path: '/oilCard'
          })
          break
        case 3:
          this.$router.push({
            path: '/eBi'
          })
          break
      }
    },
    goProList (item) {
      this.$router.push({
        path: 'proList',
        query: {
          subCategoryId: item.subCategoryId
        }
      })
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
    scrollToEnd () {
      !this.finished && this.page++
      !this.finished && this.getNewGoods()
    }
  }
}
</script>
<style lang="scss" scoped>
.indexWrap {
    background-color: #f7f7f7;
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
    .newProduct {
        padding: 0 10px;
            .newWrap {
            padding: 10px 0;
            }
        .itemWrap {
        display: flex;
        flex-wrap: wrap;
            .item{
                margin-left: 10px;
            }
            .item:nth-of-type(2n+1) {
                margin-left: 0;
            }
        }
    }
    .van-col{
        text-align: center;
    }
    .displayFlex{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        font-size: 12px;
    }
    .flex1{
        flex: 1;
        text-align: center;
        margin-left: 10px;
        background: #F2F2F2;
        padding: 10px 0;
    }
    .flex1:last-of-type{
        margin-right: 10px;
    }
    .icon{
        display: inline-block;
        background: coral;
        margin-bottom: 10px;
    }
    .icon1{
        width: 31px;
        height: 40px;
        background: url(~@/assets/img/chongzhi/icon1.png) no-repeat center center;
        background-size: 100% 100%;
    }
    .icon2{
        width: 38px;
        height: 37px;
        background: url(~@/assets/img/chongzhi/icon2.png) no-repeat center center;
        background-size: 100% 100%;
    }
    .icon3{
        width: 43px;
        height: 35px;
        background: url(~@/assets/img/chongzhi/icon3.png) no-repeat center center;
        background-size: 100% 100%;
    }

}

</style>
