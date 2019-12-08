<template>
<div class="proDetailWrap">
  <div class="proDetail">
    <div class="swipeWrap">
      <div class="goBack">
        <van-icon name="arrow-left" @click="goBack"/>
      </div>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in imgList" :key="index">
          <img :src="'http://47.107.110.186:8084'+item.src" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="describe">
      <p class="price">
        {{describe.price}}
        <span class="jf">积分</span>
      </p>
      <p class="describeText">{{describe.describeText}}</p>
    </div>
    <div class="count">
      <span>销量：{{sales}}</span>
      <span>库存：{{inventory}}</span>
    </div>
    <div class="detailBody">
      <myTitle :titleVal="'商品详情'" />
      <div class="probablyImg">
        <van-grid :column-num="2">
          <van-grid-item v-for="(item,index) in probablyImg" :key="index">
            <img :src="'http://47.107.110.186:8084'+item.src" />
          </van-grid-item>
        </van-grid>
      </div>
      <van-divider dashed>细节展示图</van-divider>
      <div class="detailImg">
        <van-image
          width="calc(100vw - 20px)"
          height="calc(50vw - 10px)"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        >
          <template v-slot:error>加载失败</template>
        </van-image>
      </div>
    </div>
    <div class="btnGroup">
      <van-row gutter="15">
        <van-col span="12">
          <van-button color="#23A85E" @click="addCar">加入购物车</van-button>
        </van-col>
        <van-col span="12">
          <van-button color="#00AEFF" @click="buyNow">立即兑换</van-button>
        </van-col>
      </van-row>
      <!-- <van-button color="#23A85E">加入购物车</van-button>
      <van-button color="#00AEFF">立即兑换</van-button>-->
    </div>
  </div>
</div>
</template>
<script>
import myTitle from '@/components/myTitle'
const getGoodsDetailUrl = '/sysGoods/getGoodsDetail'
const addCartUrl = '/sysCart/addCart'
export default {
  components: {
    myTitle
  },
  data () {
    return {
      goodId: '',
      userId: localStorage.getItem('userId'),
      proId: '',
      imgList: [],
      describe: {
        price: 3000,
        describeText: ''
      },
      sales: 0, // 销量
      inventory: 0, // 库存
      probablyImg: [
        {
          src:
            'http://img4.imgtn.bdimg.com/it/u=3276179142,1686381254&fm=26&gp=0.jpg'
        },
        {
          src:
            'http://img4.imgtn.bdimg.com/it/u=3276179142,1686381254&fm=26&gp=0.jpg'
        },
        {
          src:
            'http://img4.imgtn.bdimg.com/it/u=3276179142,1686381254&fm=26&gp=0.jpg'
        },
        {
          src:
            'http://img4.imgtn.bdimg.com/it/u=3276179142,1686381254&fm=26&gp=0.jpg'
        }
      ]
    }
  },
  created () {
    this.goodId = this.$route.query.id || ''
    this.getGoodsDetail()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getGoodsDetail () {
      this.$axios({
        url: getGoodsDetailUrl,
        method: 'post',
        params: {
          goodsId: this.goodId
        }
      }, res => {
        if (res.status === 10001) {
          let data = res.data.info
          this.imgList.push(
            {
              src: data.goodsLogo
            }
          )
          this.proId = data.id
          this.describe.price = data.dailyPrice
          this.describe.describeText = data.goodsName
          this.sales = data.saleCount
          this.inventory = data.stock
          console.log('详情', data.detail)
        } else {
          this.$toast(res.msg)
        }
      })
    },
    addCar () {
      this.$axios({
        url: addCartUrl,
        method: 'post',
        params: {
          uid: this.userId,
          goodsId: this.proId,
          goodsType: 1
        }
      }, res => {
        if (res.status === 10001) {
          this.$toast('加入成功')
        } else {
          this.$toast(res.msg)
        }
      })
    },
    buyNow () {
      let order = [
        {
          goodsLogo: this.imgList[0].src,
          goodsName: this.describe.describeText,
          price: this.describe.price,
          amount: 1
        }
      ]
      let orderString = JSON.stringify(order)
      localStorage.removeItem('order')
      localStorage.setItem('order', orderString)
      this.$router.push({
        path: '/YesOrder'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.proDetailWrap{
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
}
.proDetail {
  background: #f7f7f7;
}
.swipeWrap {
  position: relative;
  .goBack {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    z-index: 10;
    font-size: 20px;
    padding: 10px;
  }
  .van-swipe-item {
    text-align: center;
  }
  img {
    width: calc(100vw - 20px);
    height: calc(100vw - 20px);
    display: inline-block;
    overflow: hidden;
  }
}
.describe {
  padding: 10px;
  line-height: 20px;
  background: white;
}
.price {
  color: #ff0000;
  font-size: 22px;
  margin-bottom: 12px;
}
.jf {
  font-size: 14px;
}
.describeText {
  color: #333333;
  font-size: 15px;
}
.titleWrap{
    padding: 0 10px;
}
.count {
  padding: 0 10px;
  font-size: 14px;
  color: #333333;
  line-height: 40px;
  height: 40px;
  background: white;
  margin-top: 10px;
  span:nth-of-type(2) {
    margin-left: 40px;
  }
}
.probablyImg {
  img {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }
}
.van-divider {
  background: white;
  margin: 0;
  padding: 16px 0 10px 0;
  color: #333333;
  font-size:12px;
}
.detailImg {
  background: white;
  padding-bottom: 20px;
  text-align: center;
}
.btnGroup {
  padding: 0 20px;
  .van-button {
      width: 100%;
      height: 36px;
      line-height: 36px;
      border-radius: 5px;
      font-size: 14px;
  }
}
</style>
