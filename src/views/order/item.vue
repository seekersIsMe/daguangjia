<template>
  <div class="itemWrap">
      <div class="proItem" v-for="(itemPro, ind) in itemData" :key="ind">
        <div class="img">
          <img :src="'http://47.107.110.186:8082'+itemPro.goodsLogo" alt="" />
        </div>
        <div class="ProDatail">
          <p class="detail">{{ itemPro.goodsName }}</p>
          <p class="priceCount">
            <span>￥{{ itemPro.price }}</span>
            <span> x{{ itemPro.amount }} </span>
          </p>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Array,
      default: () => {
        return [
          {
            goodsLogo: '',
            goodsName: '',
            price: 0,
            amount: 0
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.itemWrap {
  .proItem:nth-of-type(1){
    border-top: none;
  }
    .proItem {
      padding: 15px 0;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border-top: 1px solid #E1E1E1;
      img {
        display: inline-block;
        width: 80px;
        height: 80px;
      }
      .img {
        margin-right: 10px;
        width: 80px;
        height: 80px;
        background: #333333;
      }
      .ProDatail {
        flex: 1;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        height: 80px;
        .detail {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; //需要显示时文本行数
          text-overflow: ellipsis;
          font-size: 15px;
          color: #333333;
          line-height: 20px;
        }
        .priceCount {
          color: #333333;
          font-size: 15px;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
        }
      }
    }
}
</style>
