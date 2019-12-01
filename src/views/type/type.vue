<template>
  <div class="typeWrap">
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
    <div class="sidebarWrap">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="(item, index) in sideData"
          :key="index"
          :title="item.categoryName"
        >{{ item.categoryName }}</van-sidebar-item>
      </van-sidebar>
      <div class="typeListWrap">
        <van-grid :column-num="3">
          <van-grid-item v-for="(item,index) in typeList[activeKey]" :key="index" @click="selectType(item)">
            <img :src="item.logo" />
            <p>{{item.subCategoryName}}</p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script>
const getCategoryUrl = '/sysCart/getCategory'
export default {
  data () {
    return {
      searchData: '',
      searchVal: '',
      activeKey: 0,
      typeList: [],
      sideData: [
        // {
        //   name: '家用电器'
        // },
        // {
        //   name: '美妆护肤'
        // },
        // {
        //   name: '家居生活'
        // },
        // {
        //   name: '手机数码'
        // },
        // {
        //   name: '箱包手袋'
        // },
        // {
        //   name: '母婴玩具'
        // },
        // {
        //   name: '服装服饰'
        // },
        // {
        //   name: '食品酒类'
        // }
      ]
    }
  },
  created () {
    this.getCategor()
  },
  methods: {
    selectType () {},
    getCategor () {
      this.$axios({
        url: getCategoryUrl,
        method: 'post'
      }, res => {
        if (res.status === 10001) {
          let sideData = res.data.info.map(p => {
            this.typeList.push(p.subList)
            return {
              categoryName: p.categoryName,
              categoryId: p.categoryId
            }
          })
          this.sideData = sideData
        } else {
          this.$toast(res.msg)
        }
      })
    },
    onSearch () {}
  }
}
</script>
<style lang="scss" scoped>
.searchWrap {
  background: #00aeff;
  /deep/ .van-search {
    background: transparent !important;
  }
}
.sidebarWrap {
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
  .van-sidebar-item {
    width: 85px;
    height: 44px;
    padding: 0;
    margin-bottom: 2px;
    /deep/ .van-sidebar-item__text {
      width: 85px;
      text-align: center;
      line-height: 44px;
      color: #333333;
      font-weight: 500;
    }
  }
  /deep/ .van-sidebar-item--select {
      border-color: #00aeff;
    }
  .typeListWrap {
    flex: 1;
  }
}
</style>
