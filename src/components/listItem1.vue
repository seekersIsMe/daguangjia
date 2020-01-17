<template>
  <div class="listItem" @click="goToDetail">
    <div class="imgWrap">
      <img :src="'http://47.107.110.186:8082'+itemData.goodsLogo" />
    </div>
    <p class="productTitle">{{itemData.goodsName}}</p>
    <div class="priceWrap">
      <span>{{ changNum(itemData.price) }}</span>
      <div class="shoppingWrap" @click.stop="addCar">
      <!-- <van-icon name="shopping-cart-o" /> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {
          goodsName: '',
          goodsLogo: '',
          price: 0
        }
      }
    }
  },
  methods: {
    // 超过一万，一千，十万
    changNum (val) {
      if (val < 1000) {
        return val
      }
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
    // 跳转到产品的详情页面
    goToDetail () {
      this.$router.push({
        path: '/proDetail',
        query: {
          id: this.itemData.id
        }
      })
    },
    addCar () {
      if (!localStorage.getItem('isLogin')) {
        this.$toast('请先登录')
        this.$router.push({
          path: '/login'
        })
      }
      this.$emit('addCar')
    }
  }
}
</script>
<style lang="scss" scoped>
.listItem{
      overflow: hidden;
      box-sizing: border-box;
      width: calc(33.3vw - 15px);
      margin-bottom: 10px;
      background: white;
      border-radius: 5px;
      padding-bottom: 15px;
    .imgWrap{
        // width: 100%;
        display: inline-block;
        height: calc(33.3vw - 15px);
        width: calc(33.3vw - 15px);
        img{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
    }
    .productTitle{
      width: calc(33.3vw - 15px);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      //  display: -webkit-box;
      // -webkit-box-orient: vertical;
      // -webkit-line-clamp: 2;
      font-size:13px;
      color: #333333;
      font-weight: 500;
      line-height: 18px;
      margin-top: 5px;
      padding: 0 9px;
    }
    .priceWrap{
       width: calc(33.3vw - 15px);
       display: flex;
       justify-content: space-between;
       color: #FF0000;
       font-size: 13px;
       margin-top: 14px;
       padding: 0 9px;
       box-sizing: border-box;
       line-height: 24px;
       .shoppingWrap{
         width: 24px;
         height: 24px;
         background: url(~@/assets/img/index/car.png) no-repeat center center;
         background-size: 100% 100%;
       }
    }
}
</style>
