<template>
  <div class="proList">
    <van-sticky>
      <div class="searchWrap">
        <form action="/">
          <van-search
            v-model="searchData"
            placeholder="搜索商品名称"
            clearable
            shape="round"
            @search="onSearch"
          />
        </form>
      </div>
      <div class="tabWrap">
        <van-tabs v-model="active">
          <van-tab title="默认"></van-tab>
          <van-tab title="销量"></van-tab>
          <van-tab>
            <template slot="title">
              <div class="arrowWrap">
                <span>价格</span>
                <span class="arrow" @click.stop="changePriceSort">
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
    <keep-alive>
      <div class="result">
          <van-list
            v-model="loading[0]"
            :finished="finished[0]"
            finished-text="没有更多了"
            @load="scrollToEnd(0)"
          >
            <div class="proListWrap">
              <div v-for="(item,index) in itemCount[0]" :key="index" class="item">
                <listItem :key="index" />
              </div>
            </div>
          </van-list>
      </div>
    </keep-alive>
  </div>
</template>
<script>
import listItem from '@/components/listItem'
export default {
  components: {
    listItem
  },
  data () {
    return {
      searchData: '',
      active: 0,
      isPriceDown: true,
      brand: 0,
      brandOption: [
        { text: '品牌', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      brandListIsShow: false,
      itemCount: [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6]
      ],
      loading: [false, false, false, false],
      finished: [false, false, false, false]
    }
  },
  methods: {
    onSearch () {},
    changePriceSort () {
      this.isPriceDown = !this.isPriceDown
      this.$refs.brandList.toggle(false)
    },
    selectBrand () {
      this.brandListIsShow = !this.brandListIsShow
      this.$refs.brandList.toggle(this.brandListIsShow)
    },
    menuClose () {
      this.brandListIsShow = false
    },
    scrollToEnd (val) {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.itemCount[val].push(this.itemCount.length + 1)
        }
        this.loading[val] = false
      }, 500)
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
