<template>
  <div class="bgW">
    <div class="carItem" v-for="(item,index) in itemDataList_" :key="index">
      <div class="checkbox">
        <van-checkbox v-model="item.checked" @change="select"></van-checkbox>
      </div>
      <div class="img">
        <img :src="'http://47.107.110.186:8082'+item.goodsLogo" alt />
      </div>
      <div class="carBody">
        <p class="title">{{item.goodsName}}</p>
        <div class="priceCount">
          <span class="price">{{changNum(item.price)}}积分</span>
          <van-stepper v-model="item.amount" @change="changeCount" integer input-width="22px" button-size="22px"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'itemDataList',
    event: 'change'
  },
  props: {
    itemDataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      itemDataList_: this.itemDataList
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
    select () {
      this.$emit('change', this.itemDataList_)
    },
    changeCount () {
      this.$emit('change', this.itemDataList_)
    }
  }
}
</script>
<style lang="scss" scoped>
.bgW{
  background: white;
}
.carItem:nth-of-type(2n){
border-top: 1px solid #E1E1E1;
}
.carItem {
  padding: 20px 0;
  margin: 0 15px;
  background: white;
  display: flex;
  align-items: center;
  // margin-bottom:10px;
  .checkbox{
      margin-right: 15px;
  }
  .img {
    width: 90px;
    height: 90px;
    margin-right: 10px;
    overflow: hidden;
    img {
      display: inline-block;
      width: 100%;
    }
  }
  .carBody {
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 90px;
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      color: #333333;
      line-height: 23px;
      font-size: 14px;
    }
    .priceCount {
      display: flex;
      justify-content: space-between;
      .price {
        font-size: 14px;
        color: #ff0000;
        line-height: 28px;
      }
    }
  }
}
</style>>
