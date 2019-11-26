<template>
  <div class="shoppingCartWrap">
    <div class="title">
      <p class="titleCar">购物车</p>
      <p class="optionText" @click="manage">{{isManage?'完成':'管理'}}</p>
    </div>
    <div v-if="itemDataList.length>0">
      <div class="carItemWrap">
      <div class="list">
        <carItem v-model="itemDataList" @change="carChange" />
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
      <van-button round type="primary" v-if="!isManage" color="#00AEFF">结算</van-button>
      <van-button round type="primary" v-else color="#FF0000" @click="del">删除</van-button>
    </div>
    </div>
    <div class="noPro" v-else>
      <div class="noProBg">
      </div>
      <p>您的购物车是空的</p>
    </div>
  </div>
</template>
<script>
import carItem from './carItem'
export default {
  components: {
    carItem
  },
  data () {
    return {
      itemDataList: [
        {
          checked: false,
          src:
            'http://img3.duitang.com/uploads/item/201605/07/20160507191419_J2m8R.thumb.700_0.jpeg',
          title:
            'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包dsadsadasdasdsdsBA6097-363',
          price: 50000,
          count: 1
        },
        {
          checked: false,
          src:
            'http://img3.duitang.com/uploads/item/201605/07/20160507191419_J2m8R.thumb.700_0.jpeg',
          title: 'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 5000,
          count: 500
        },
        {
          checked: false,
          src:
            'http://img3.duitang.com/uploads/item/201605/07/20160507191419_J2m8R.thumb.700_0.jpeg',
          title: 'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 5000,
          count: 500
        },
        {
          checked: false,
          src:
            'http://img3.duitang.com/uploads/item/201605/07/20160507191419_J2m8R.thumb.700_0.jpeg',
          title: 'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 5000,
          count: 500
        },
        {
          checked: false,
          src:
            'http://img3.duitang.com/uploads/item/201605/07/20160507191419_J2m8R.thumb.700_0.jpeg',
          title: 'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 5000,
          count: 500
        },
        {
          checked: false,
          src:
            'http://img3.duitang.com/uploads/item/201605/07/20160507191419_J2m8R.thumb.700_0.jpeg',
          title: 'Nike耐克男女包2019冬新款学生书包运动休闲包双肩背包BA6097-363',
          price: 5000,
          count: 500
        }
      ],
      isSelectAll: false,
      sum: 0,
      isManage: false
    }
  },
  methods: {
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
      this.$dialog.confirm({
        title: '删除商品',
        message: '确定删除所选商品'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.shoppingCartWrap {
  background: #f7f7f7;
  height: 100vh;
  padding-bottom: 120px;
  box-sizing: border-box;
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
  .settleWrap{
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
    .van-checkbox,.heji {
      color: #333333;
    }
    .jifen{
      color: #FF0000;
    }
    .van-button{
      width: 80px;
      height: 35px;
      line-height: 35px;
      /deep/ .van-button__text{
        font-size: 16px;
      }
    }
    .left{
      display: flex;
      .van-checkbox{
        margin-right: 20px;
        font-size: 16px;
      }
    }
  }
  .noPro{
    margin-top: 20vw;
    color: #999999;
    font-size: 14px;
    text-align: center;
    .noProBg{
        margin: auto;
        width: 40vw;
        height: 44vw;
        background: url(~@/assets/img/nocProcar.png) no-repeat center center;
        background-size: 100% 100%;
    }
    p{
        margin-top: 20px;
    }
}
}
</style>
