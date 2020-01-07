<template>
  <div class="item">
    <div class="title">
      <p>{{ itemData.name }}</p>
      <p>
        {{ itemData.count }}
      </p>
    </div>
    <div class="itemBody">
      <div class="left">
        <p>
          {{ itemData.code }}
        </p>
        <p>
          {{ itemData.date }}
        </p>
      </div>
      <div class="right">
        {{ itemData.status === 1 ? '已使用' : '立即兑换' }}
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
          name: '星巴克星享卡',
          count: 1,
          price: 5000,
          date: '2019-10-6',
          code: 'dsds120120',
          status: 1
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .item {
    background: #ffffff;
    padding: 10px;
    border-radius: 5px;
    .title{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .itemBody{
      display: flex;
      justify-content: space-between;
    }
  }
</style>