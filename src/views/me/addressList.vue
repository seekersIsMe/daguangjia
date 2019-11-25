<template>
  <div class="addressListWrap">
    <van-sticky>
      <div class="header bgW">
        <van-icon name="arrow-left" />收货地址
      </div>
    </van-sticky>
    <div class="addressList bgW">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
      </van-list>
    </div>
    <div class="addBtn" @click="addAddress">
      <van-button type="primary" icon="add-o" color="#00AEFF">新建收货地址</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      finished: false,
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
    addAddress () {
      this.$router.push({
        path: '/addAddress'
      })
    },
    onLoad () {
      setTimeout(() => {
        this.addressList.push(
          ...[
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
        )
        this.loading = false
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
.addressListWrap {
  height: 100vh;
  overflow: hidden;
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
