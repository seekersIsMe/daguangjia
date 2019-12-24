<template>
  <div class="proList">
    <van-sticky>
      <div class="searchWrap">
        <form action="/">
          <van-search
            v-model="searchVal"
            placeholder="搜索商品名称"
            clearable
            shape="round"
            @search="onSearch"
          />
        </form>
      </div>
      <div class="tabWrap">
        <van-tabs v-model="active" @change='changeType'>
          <van-tab title="默认"></van-tab>
          <van-tab>
            <template slot="title">
              <div class="arrowWrap">
                <span>销量</span>
                <span class="arrow" @click="changeSalesSort">
                  <van-icon v-if="isSalesDown" name="arrow-down" />
                  <van-icon v-else name="arrow-up" />
                </span>
              </div>
            </template>
          </van-tab>
          <van-tab>
            <template slot="title">
              <div class="arrowWrap">
                <span>价格</span>
                <span class="arrow" @click="changePriceSort">
                  <van-icon v-if="isPriceDown" name="arrow-down" />
                  <van-icon v-else name="arrow-up" />
                </span>
              </div>
            </template>
          </van-tab>
          <van-tab>
            <template slot="title">
              <div class="arrowWrap">
                <span>品牌</span>
                <span class="arrow" @click.stop="selectBrand">
                  <van-icon v-if="!brandListIsShow" name="arrow-down" />
                  <van-icon v-else name="arrow-up" />
                </span>
                <div class="brandList">
                  <van-dropdown-menu>
                    <van-dropdown-item @close='menuClose' ref="brandList" v-model="brand" :options="brandOption"></van-dropdown-item>
                  </van-dropdown-menu>
                </div>
              </div>
            </template>
          </van-tab>
        </van-tabs>
      </div>
    </van-sticky>
    <!-- <keep-alive> -->
      <div class="result">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="scrollToEnd"
          >
            <div class="proListWrap">
              <div v-for="(item,index) in itemCount" :key="index" class="item">
                <listItem :itemData="item" @addCar="addCar"/>
              </div>
            </div>
          </van-list>
      </div>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
import listItem from '@/components/listItem'
const getNewGoodsUrl = '/sysGoods/getNewGoods'
const addCartUrl = '/sysCart/addCart'
export default {
  name: 'proList',
  components: {
    listItem
  },
  data () {
    return {
      searchVal: '',
      active: 0,
      page: 1,
      isPriceDown: true,
      isSalesDown: true,
      brand: 0,
      brandOption: [
        { text: '品牌', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      brandListIsShow: false,
      itemCount: [],
      loading: false,
      finished: true,
      queryParam: {},
      userId: localStorage.getItem('userId'),
      subCategoryId: ''
    }
  },
  created () {
    this.searchVal = this.$route.query.goodsName || ''
    this.subCategoryId = this.$route.query.subCategoryId || ''
    this.getNewGoods()
  },
  methods: {
    addCar (item) {
      this.$axios({
        url: addCartUrl,
        method: 'post',
        params: {
          uid: this.userId,
          goodsId: item.id,
          goodsType: 1
        }
      }, res => {
        if (res.status === 10001) {
          this.$toast('添加成功')
        } else {
          this.$toast(res.msg)
        }
      })
    },
    changeType () {
      this.itemCount = []
      this.page = 1
      this.finished = false
      this.loading = false
      switch (this.active) {
        case 0:
          this.queryParam = {}
          this.getNewGoods()
          break
        case 1:
          this.queryParam = {
            orderBy: this.isSalesDown ? 0 : 1
          }
          this.getNewGoods()
          break
        case 2:
          this.queryParam = {
            orderPrice: this.isPriceDown ? 0 : 1
          }
          this.getNewGoods()
          break
        case 3:
          this.queryParam = {}
          this.getNewGoods()
          break
      }
    },
    getNewGoods () {
      let params = {
        page: this.page,
        brandId: '',
        goodsName: this.searchVal,
        subCategoryId: this.subCategoryId,
        ...this.queryParam
      }
      this.$axios({
        url: getNewGoodsUrl,
        method: 'post',
        params: params
      }, res => {
        if (res.status === 10001) {
          this.itemCount = [...this.itemCount, ...res.data.info]
          this.loading = false
          if (res.data.info && res.data.info.length < 10) {
            this.finished = true
          }
        } else {
          this.$toast(res.msg)
        }
      })
    },
    onSearch () {},
    changeSalesSort () {
      if (this.active !== 1) {
        return
      }
      this.isSalesDown = !this.isSalesDown
      this.$refs.brandList.toggle(false)
      this.queryParam = {
        orderBy: this.isSalesDown ? 0 : 1
      }
      this.page = 1
      this.itemCount = []
      this.getNewGoods()
    },
    changePriceSort () {
      if (this.active !== 2) {
        return
      }
      this.isPriceDown = !this.isPriceDown
      this.$refs.brandList.toggle(false)
      this.queryParam = {
        orderPrice: this.isPriceDown ? 0 : 1
      }
      this.page = 1
      this.itemCount = []
      this.getNewGoods()
    },
    selectBrand () {
      if (this.active !== 3) {
        return
      }
      this.brandListIsShow = !this.brandListIsShow
      this.$refs.brandList.toggle(this.brandListIsShow)
      this.queryParam = {}
      this.getNewGoods()
    },
    menuClose () {
      this.brandListIsShow = false
    },
    scrollToEnd (val) {
      !this.finished && this.page++
      !this.finished && this.getNewGoods()
    }
  }
}
</script>
<style lang="scss" scoped>
.proList{
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
}
.searchWrap {
  background: #ffffff;
  /deep/ .van-search {
    background: transparent !important;
  }
}
.arrowWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  .arrow {
    align-self: flex-end;
    margin-left: 5px;
    height: 44px;
    line-height: 52px;
  }
}
.brandList {
  width: 0;
  height: 44px;
  overflow: hidden;
}
.proListWrap {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  background: #f7f7f7;
  .item:nth-of-type(2n) {
    margin-left: 10px;
  }
}
 .van-list{
    padding-bottom: 70px;
  }
</style>
