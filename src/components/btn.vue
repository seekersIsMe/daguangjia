<template>
  <div class="btnWrap">
    <div class="title">
      {{ myTitle }}
    </div>
    <div class="right">
      <slot name="right"> </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    myTitle: ''
  }
}
</script>
<style lang="scss" scoped>
  .btnWrap{
    height: 26px;
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    .right,.title{
      height: 100%;
      padding: 0 4px;
      border-radius: 3px;
    }
    .title{
      background-color: #E40D0D;
      color:white;
      line-height: 26px;
      text-align: center;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .right{
      box-sizing: border-box;
      border: 1px solid #E40D0D;
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      transform: translateX(-2px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 2px;
    }
  }
</style>
