<template>
  <div class="shoppingCartWrap">
    <div class="title">
      <p class="titleCar">购物车</p>
      <p class="optionText" @click="manage">{{isManage?'完成':'管理'}}</p>
    </div>
    <div v-if="itemDataList.length>0">
      <div class="carItemWrap">
        <div class="list">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="onLoad">
            <carItem v-model="itemDataList" @change="carChange" />
          </van-list>
        </div>
      </div>
      <div class="settleWrap">
        <div class="left">
          <van-checkbox v-model="isSelectAll" @change="selectAll">全选</van-checkbox>
          <p v-show="!isManage">
            <span class="heji">合计：</span>
            <span class="jifen">{{ sum }}积分</span>
          </p>
        </div>
        <van-button round type="primary" v-if="!isManage" color="#00AEFF" @click="settle">结算</van-button>
        <van-button round type="primary" v-else color="#FF0000" @click="del">删除</van-button>
      </div>
    </div>
    <div class="noPro" v-else>
      <div class="noProBg"></div>
      <p>您的购物车是空的</p>
    </div>
  </div>
</template>
<script>
import carItem from './carItem'
const getCartListUrl = '/sysCart/getCartList'
const deleteCartUrl = '/sysCart/deleteCart'
const operateCartUrl = '/sysCart/operateCart'
export default {
  name: 'shoppingCart',
  components: {
    carItem
  },
  data () {
    return {
      userId: localStorage.getItem('userId'),
      page: 1,
      loading: false,
      finished: false,
      itemDataList: [],
      isSelectAll: false,
      sum: 0,
      isManage: false,
      selectPro: [],
      delList: []
    }
  },
  created () {
    this.getCartList()
  },
  methods: {
    settle () {
      let selectPros = []
      this.itemDataList.forEach(p => {
        if (p.checked) {
          selectPros.push(p.cartId)
        }
      })
      if (selectPros.length === 0) {
        this.$toast('请先选择要兑换的商品')
        return
      }
      let order = JSON.stringify(this.itemDataList)
      localStorage.setItem('order', order)
      this.$router.push({
        path: '/YesOrder'
      })
    },
    onLoad () {
      !this.finished && this.page++
      !this.finished && this.getCartList()
    },
    getCartList () {
      this.$axios(
        {
          url: getCartListUrl,
          method: 'post',
          params: {
            uid: this.userId,
            page: this.page
          }
        },
        res => {
          if (res.status === 10001) {
            if (res.data.info) {
              let itemDataList = res.data.info.map(p => {
                p.checked = false
                return p
              })
              this.itemDataList = [...this.itemDataList, ...itemDataList]
              this.loading = false
              if (res.data.info && res.data.info.length < 10) {
                this.finished = true
              }
            }
          } else {
            this.$toast(res.msg)
          }
        }
      )
    },
    carChange (val) {
      console.log(val)
    },
    manage () {
      this.isManage = !this.isManage
    },
    selectAll () {
      this.itemDataList.forEach(p => {
        p.checked = this.isSelectAll
      })
    },
    del () {
      let carIds = []
      this.itemDataList.forEach(p => {
        if (p.checked) {
          carIds.push(p.cartId)
        }
      })
      if (carIds.length === 0) {
        this.$toast('请先选择要删除的商品')
        return
      }
      this.$dialog
        .confirm({
          title: '删除商品',
          message: '确定删除所选商品'
        })
        .then(() => {
          this.$axios({
            url: deleteCartUrl,
            method: 'post',
            params: {
              uid: this.userId,
              cartIds: carIds.join(',')
            }
          }, res => {
            if (res.status === 10001) {
              this.page = 1
              this.finished = false
              this.loading = false
              this.itemDataList = []
              this.getCartList()
              this.$toast('删除成功')
            } else {
              this.$toast(res.msg)
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  destroyed () {
    if (this.itemDataList.length === 0) {
      return
    }
    let cartIds = this.itemDataList.map(p => {
      return p.cartId
    })
    let amounts = this.itemDataList.map(p => {
      return p.amount
    })
    this.$axios({
      url: operateCartUrl,
      method: 'post',
      params: {
        uid: this.userId,
        cartIds: cartIds.join(','),
        amounts: amounts.join(',')
      }
    }, res => {
      if (res.status === 10001) {
        // this.$toast('保存成功')
      } else {
        this.$toast(res.msg)
      }
    })
  },
  watch: {
    itemDataList: {
      handler () {
        this.selectPro = []
        this.itemDataList.forEach(p => {
          if (p.checked) {
            this.selectPro.push(p)
          }
        })
        if (this.selectPro.length > 0) {
          this.sum = this.selectPro.reduce((a, b) => {
            return a + b.price * b.amount
          }, 0)
        } else {
          this.sum = 0
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.shoppingCartWrap {
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
  // overflow-y: auto;
  background: #f7f7f7;
  padding-bottom: 120px;
  overflow: hidden;
  position: relative;
  .title {
    line-height: 40px;
    text-align: center;
    position: relative;
    background: white;
    .titleCar {
      font-size: 18px;
      color: #000000;
    }
    .optionText {
      position: absolute;
      right: 15px;
      top: 0;
      color: #00aeff;
      font-size: 14px;
    }
  }
  .carItemWrap {
    margin-top: 10px;
    height: calc(100vh - 150px);
    overflow-y: auto;
  }
  .settleWrap {
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    font-size: 16px;
    background: white;
    border-top: 1px solid #e8e8e7;
    .van-checkbox,
    .heji {
      color: #333333;
    }
    .jifen {
      color: #ff0000;
    }
    .van-button {
      width: 80px;
      height: 35px;
      line-height: 35px;
      /deep/ .van-button__text {
        font-size: 16px;
      }
    }
    .left {
      display: flex;
      .van-checkbox {
        margin-right: 20px;
        font-size: 16px;
      }
    }
  }
  .noPro {
    margin-top: 20vw;
    color: #999999;
    font-size: 14px;
    text-align: center;
    .noProBg {
      margin: auto;
      width: 40vw;
      height: 44vw;
      background: url(~@/assets/img/nocProcar.png) no-repeat center center;
      background-size: 100% 100%;
    }
    p {
      margin-top: 20px;
    }
  }
}
</style>
