<template>
  <div class="item">
    <div class="left">
      <div class="info">
        <img :src="itemData.src" alt />
        <span class="name">{{itemData.name}}</span>
      </div>
      <div>
        <span class="price">{{itemData.price}}积分</span>
      </div>
    </div>
    <div class="right">
      <van-button round type="info" @click="change">立即兑换</van-button>
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
          name: '星巴克星享卡',
          price: 5000
        }
      }
    }
  },
  methods: {
    change () {
      this.$emit('change')
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  background: url(~@/assets/img/ka.png) no-repeat center center;
  background-size: 100% 100%;
  width: calc(100vw - 30px);
  height: calc((100vw - 30px) / 2.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 6px;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .info {
      height: 50px;
      overflow: hidden;
      img {
        display: inline-block;
        width: 50px;
        height: 50px;
        vertical-align: middle;
      }
      .name {
        color: #333333;
        font-size: 18px;
        margin-left: 5px;
      }
    }
    .price {
      color: #eb7e4a;
      font-size: 15px;
      line-height: 30px;
      height: 32px;
      display: inline-block;
      box-sizing: border-box;
      border-top: 1px solid currentColor;
      border-bottom: 1px solid currentColor;
      padding: 0 10px;
    }
  }
}
.van-button{
    width: 90px;
    height: 30px;
    font-size: 14px;
    line-height: 28px;
    box-sizing: border-box;
    overflow: hidden;
    .van-button__text{
        line-height: 28px;
        display: inline-block;
        height: 28px;
    }
}
</style>
