<template>
  <div class="YesOrder">
    <div class="header bgW">
      <van-icon @click="goBack" name="arrow-left" />我的订单
    </div>
    <div class="address bgW">
      <p class="title">收件信息</p>
      <div class="msgBody">
        <div class="left">
          <p class="p1">
            <span class="name">{{ name }}</span>
            <span class="tel">{{ tel }}</span>
          </p>
          <p class="p2">
            <span>收获地址</span>
            <span class="address">{{ address }}</span>
          </p>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="dash"></div>
    </div>
    <div class="proList">
      <p class="title">商品清单</p>
      <item :itemData="proList" />
    </div>
    <div class="footer">
      <div>
        <span>合计积分：</span>
        <span class="price">{{ sumScore }}</span>
      </div>

      <van-button type="primary" color="#00AEFF">立即兑换</van-button>
    </div>
  </div>
</template>
<script>
import item from './item'
export default {
  components: {
    item
  },
  data() {
    return {
      name: '陈有三',
      tel: '18365412974',
      address: '广东省广州市天河区珠江新城369号',
      sumScore: 10000000,
      proList: [
        {
          src: '',
          detail:
            'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 1000,
          count: 20
        },
        {
          src: '',
          detail:
            'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 1000,
          count: 20
        },
        {
          src: '',
          detail:
            'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 1000,
          count: 20
        },
        {
          src: '',
          detail:
            'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 1000,
          count: 20
        },
        {
          src: '',
          detail:
            'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 1000,
          count: 20
        },
        {
          src: '',
          detail:
            'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 1000,
          count: 20
        },
        {
          src: '',
          detail:
            'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 1000,
          count: 20
        }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
    // lookOrder () {
    //   this.$router.push({
    //     path: '/orderDetail'
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
.bgW {
  background: white;
}
.YesOrder {
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
  background: #f7f7f7;
  .header {
    position: relative;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #000000;
    font-size: 18px;
    .van-icon {
      position: absolute;
      left: 15px;
      top: 11px;
    }
  }
  .address {
    padding: 10px;
    margin-top: 10px;
    position: relative;
    .dash {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: linear-gradient(
        to right,
        #ff6c6c,
        #ff6c6c 8px,
        transparent 8px,
        transparent 10px,
        #1989fa 10px,
        #1989fa 18px,
        transparent 18px,
        transparent 20px
      );
      background-size: 20px 100%;
    }
    .title {
      font-size: 15px;
      color: #000000;
      font-weight: 500;
    }
    .msgBody {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .p1 {
        color: #666666;
        font-size: 15px;
        line-height: 30px;
      }
      .p2 {
        color: #666666;
        font-size: 13px;
      }
    }
  }
  .proList {
    padding: 15px;
  }
  .footer {
    /*iphone XR*/
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
      bottom: 34px;
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
      bottom: 34px;
    }
    /*iphone XMAX*/
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
      bottom: 34px;
    }
    /* iphone X/XS */
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
      bottom: 34px;
    }
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    font-size: 15px;
    color: #333333;
    height: 50px;
    box-sizing: border-box;
    .price {
      color: #ff0000;
      margin-left: 5px;
    }
    .van-button {
      border-radius: 5px;
      height: 38px;
      line-height: 38px;
    }
  }
}
</style>
