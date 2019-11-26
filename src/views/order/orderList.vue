<template>
  <div class="orderList">
    <van-sticky>
      <div class="header bgW"><van-icon @click="goBack" name="arrow-left" />我的订单</div>
      <van-tabs v-model="active">
        <van-tab title="全部"></van-tab>
        <van-tab title="待支付"></van-tab>
        <van-tab title="待发货"></van-tab>
        <van-tab title="已完成"></van-tab>
      </van-tabs>
    </van-sticky>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="item bgW" v-for="(item, index) in listData" :key="index" @click="gotoOrderDetail">
          <div class="title">
            <span class="orderCode"> 订单号：{{ item.orderCode }} </span>
            <span class="orderStatus">{{ item.orderStatus }}</span>
          </div>
          <item :itemData="item.itemPro" />
          <div class="footer">
            <span class="color33">删除订单</span>
            <div class="right">
              <span class="color33">共{{ item.count }}件</span>
              <span class="color33">
                合计：
              </span>
              <span class="sumScore">
                {{ item.sumScore }}
              </span>
            </div>
          </div>
        </div>
      </van-list>
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
      active: 1,
      loading: false,
      finished: false,
      listData: [
        {
          orderCode: '2013548932166',
          orderStatus: '已完成',
          count: 9999,
          sumScore: 85464464,
          itemPro: [
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
        },
        {
          orderCode: '2013548932166',
          orderStatus: '已完成',
          count: 9999,
          sumScore: 85464464,
          itemPro: [
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
        },
        {
          orderCode: '2013548932166',
          orderStatus: '已完成',
          count: 9999,
          sumScore: 85464464,
          itemPro: [
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
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    gotoOrderDetail() {
      this.$router.push({
        path: '/orderDetail'
      })
    },
    onLoad () {
      setTimeout(() => {
        this.listData.push(
          ...[
            {
              orderCode: '2013548932166',
              orderStatus: '已完成',
              count: 9999,
              sumScore: 85464464,
              itemPro: [
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
            },
            {
              orderCode: '2013548932166',
              orderStatus: '已完成',
              count: 9999,
              sumScore: 85464464,
              itemPro: [
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
          ]
        )
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .van-tabs{
  /deep/.van-tab--active{
  color: #00AEFF;
}
/deep/.van-tabs__line{
  background-color: #00AEFF;
}
}
.bgW {
  background: white;
}
.orderList {
  background: #f7f7f7;
}
.header {
  position: relative;
  text-align: center;
  height: 40px;
  line-height: 40px;
  .van-icon {
    position: absolute;
    top: 11px;
    left: 10px;
  }
}
.item {
  padding: 10px;
  margin-top: 10px;
}
.title {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  .orderCode {
    color: #333333;
  }
  .orderStatus {
    color: #00aeff;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  .color33 {
    color: #999999;
  }
  .sumScore {
    color: #ff0000;
    font-weight: 500;
  }
}
</style>
