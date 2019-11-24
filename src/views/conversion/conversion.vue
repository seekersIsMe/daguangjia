<template>
  <div class="conversionWrap">
    <div class="scrollWrap">
      <div class="goBack" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <div class="title">积分兑换卡券享更多优惠</div>
      <div class="line"></div>
      <div class="itemWrap">
        <item v-for="(item,index) in itemData" :key="index" :itemData="item" />
      </div>
    </div>
  </div>
</template>
<script>
import item from './item'
export default {
  components: {
    item
  },
  data () {
    return {
      itemData: [
        {
          name: '星巴克星享卡',
          price: 5000
        },
        {
          name: '星巴克星享卡',
          price: 5000
        },
        {
          name: '星巴克星享卡',
          price: 5000
        },
        {
          name: '星巴克星享卡',
          price: 5000
        },
        {
          name: '星巴克星享卡',
          price: 5000
        },
        {
          name: '星巴克星享卡',
          price: 5000
        },
        {
          name: '星巴克星享卡',
          price: 5000
        },
        {
          name: '星巴克星享卡',
          price: 5000
        },
        {
          name: '星巴克星享卡',
          price: 5000
        }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.conversionWrap {
  background: url(~@/assets/img/bg.png) no-repeat center center;
  background-size: 100% 100%;
  height: 100vh;
  overflow: hidden;
  .scrollWrap {
    height: 100%;
    overflow: auto;
    position: relative;
  }
  .goBack {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    z-index: 10;
    font-size: 20px;
    padding: 10px;
    color: white;
  }
  .title {
    padding: 60px 0 0 10px;
    font-size: 18px;
    color: white;
    line-height: 40px;
  }
  .line {
    width: 80px;
    height: 2px;
    background: white;
    margin-left: 10px;
    margin-bottom: 30px;
  }
  .itemWrap {
    padding: 0 15px;
  }
}
</style>
