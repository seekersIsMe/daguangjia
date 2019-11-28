<template>
  <div class="addressListWrap">
    <van-sticky>
      <div class="header bgW">
        <van-icon name="arrow-left" @click="goBack"/>收货地址
      </div>
    </van-sticky>
    <div class="addressList bgW">
        <div class="item" v-for="(item,index) in addressList" :key="index">
          <div class="body">
            <div class="p1">
              <span class="name w100">{{ item.name }}</span>
              <span class="tel">{{item.tel}}</span>
              <span class="default" v-if="index===0">默认</span>
            </div>
            <div class="p2">
              <span class="addressTitle w100">收货地址</span>
              <span class="adress">{{ item.address }}</span>
            </div>
          </div>
          <div class="icon">
            <van-icon name="edit" />
          </div>
        </div>
    </div>
    <div class="addBtn" @click="addAddress">
      <van-button type="primary" icon="add-o" color="#00AEFF">新建收货地址</van-button>
    </div>
  </div>
</template>
<script>
const getAddressListUrl = '/sysUser/getAddress'
export default {
  data () {
    return {
      userId: localStorage.getItem('userId'),
      addressList: [
        {
          name: '张三疯张三疯张三疯张三疯',
          tel: '15384658754',
          address: '广东省广州市天河区珠江新城369号'
        },
        {
          name: '张三疯',
          tel: '15384658754',
          address: '广东省广州市天河区珠江新城369号'
        },
        {
          name: '张三疯',
          tel: '15384658754',
          address: '广东省广州市天河区珠江新城369号'
        },
        {
          name: '张三疯',
          tel: '15384658754',
          address: '广东省广州市天河区珠江新城369号'
        },
        {
          name: '张三疯',
          tel: '15384658754',
          address: '广东省广州市天河区珠江新城369号'
        },
        {
          name: '张三疯',
          tel: '15384658754',
          address: '广东省广州市天河区珠江新城369号'
        },
        {
          name: '张三疯',
          tel: '15384658754',
          address: '广东省广州市天河区珠江新城369号'
        },
        {
          name: '张三疯',
          tel: '15384658754',
          address: '广东省广州市天河区珠江新城369号'
        },
        {
          name: '张三疯',
          tel: '15384658754',
          address: '广东省广州市天河区珠江新城369号'
        },
        {
          name: '张三疯',
          tel: '15384658754',
          address: '广东省广州市天河区珠江新城369号'
        },
        {
          name: '张三疯',
          tel: '15384658754',
          address: '广东省广州市天河区珠江新城369号'
        }
      ]
    }
  },
  methods: {
    getAddressList () {
      this.$axios({
        url: getAddressListUrl,
        params: {
          uid: this.userId
        },
        method: 'post'
      }, res => {
        if (res.status === 10001) {
            let {interal, orderStatus, info} = res.data.info
            this.interal = interal
            this.orderStatus = orderStatus
            this.info = info
          } else {
            this.$toast(res.msg)
          }
      })
    },
    addAddress () {
      this.$router.push({
        path: '/addAddress'
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.addressListWrap {
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
  position: relative;
  background: #f7f7f7;

  .bgW {
    background: white;
  }
  .header {
    position: relative;
    line-height: 40px;
    height: 40px;
    color: #000000;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    .van-icon {
      position: absolute;
      left: 15px;
      font-size: 18px;
      margin-top: 11px;
    }
  }
  .addressList {
    height: 100%;
    overflow-y: auto;
    margin-top: 10px;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 10px 15px;
    .body {
      flex: 1;
      .w100 {
        width: 60px;
        display: inline-block;
      }
      .p1 {
        font-size: 15px;
        color: #333333;
        line-height: 24px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .default {
          width: 45px;
          height: 18px;
          line-height: 18px;
          font-size: 12px;
          color: white;
          background: linear-gradient(to right, #5ddb86, #24cc36);
          text-align: center;
          margin-left: 20px;
        }
      }
      .p2 {
        color: #666666;
        font-size: 12px;
      }
    }
    .icon {
      display: flex;
      align-items: center;
      color: #00aeff;
    }
  }
  .addBtn {
    padding: 0 20px;
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    .van-button {
      height: 45px;
      width: 100%;
      line-height: 45px;
      color: white;
      font-size: 16px;
      border-radius: 5px;
    }
  }
}
</style>
