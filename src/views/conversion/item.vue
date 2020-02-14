<template>
  <div class="item" :class="bgClass">
    <div class="title">
      <p>{{ itemData.productName }} （￥{{itemData.amount}}）</p>
      <p>
        <!-- {{ itemData.count }} -->
        x 1
      </p>
    </div>
    <div class="itemBody">
      <div class="left">
        <p>
          券码：{{ itemData.ticketNo }}
        </p>
        <p>
          有效期：{{ itemData.overTime }}
        </p>
      </div>
      <div class="right" @click="use">
        {{ active === 1 ? '已使用' : '充值' }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    active: {
      type: Number,
      default: 1
    }
  },
  computed: {
    bgClass () {
      return this.active === 0 ? 'bgn' : 'bgo'
    }
  },
  methods: {
    use () {
      if (this.active === 1) {
        return
      }
      this.$emit('use', this.itemData)
    }
  }
}
</script>
<style lang="scss" scoped>
.bgo{
   background: #f0f0c8;
   color: #ffffff;
   .right{
     color: #BFBAA7;
   }
}
.bgn{
   background: #ffba23;
   color: #333333;
   .right{
   }
}
  .item {
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    .title{
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    .itemBody{
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 20px;
      font-size: 12px;
    }
  }
  .right{
    padding: 6px 10px;
    border-radius:  5px;
    background: white;
  }
</style>
