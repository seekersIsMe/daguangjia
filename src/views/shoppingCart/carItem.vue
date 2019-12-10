<template>
  <div>
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
          <span class="price">{{item.price}}积分</span>
          <van-stepper v-model="item.amount" @change="changeCount" integer />
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
.carItem {
  padding: 20px 15px;
  background: white;
  display: flex;
  align-items: center;
  margin-bottom:10px;
  .checkbox{
      margin-right: 15px;
  }
  .img {
    width: 90px;
    height: 90px;
    margin-right: 10px;
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
        font-size: 16px;
        color: #ff0000;
        line-height: 28px;
      }
    }
  }
}
</style>>
