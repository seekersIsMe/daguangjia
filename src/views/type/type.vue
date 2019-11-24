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
          :title="item.name"
        >{{ item.name }}</van-sidebar-item>
      </van-sidebar>
      <div class="typeListWrap">
        <van-grid :column-num="3">
          <van-grid-item v-for="value in typeList[activeKey]" :key="value">
            <img src alt />
            <p></p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchData: '',
      searchVal: '',
      activeKey: 0,
      typeList: [5, 6, 8, 7, 5, 4],
      sideData: [
        {
          name: '家用电器'
        },
        {
          name: '美妆护肤'
        },
        {
          name: '家居生活'
        },
        {
          name: '手机数码'
        },
        {
          name: '箱包手袋'
        },
        {
          name: '母婴玩具'
        },
        {
          name: '服装服饰'
        },
        {
          name: '食品酒类'
        }
      ]
    }
  },
  methods: {
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
