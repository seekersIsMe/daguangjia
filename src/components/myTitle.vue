<template>
  <div class="titleWrap">
    <div class="left">
      <div class="strip"></div>
      <span class="title">
        {{ titleVal }}
      </span>
    </div>
    <div class="right">
      <slot name='right'>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    titleVal: ''
  }
}
</script>
<style lang="scss" scoped>
  .titleWrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    .left{
      display: flex;
      justify-content: start;
      align-items: center;
      height: 100%;
      .strip{
        height: 30px;
        width: 4px;
        background-color: #00AEFF;
        border-radius: 3px;
      }
      .title{
        font-size: 14px;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height: 36px;
        margin-left: 5px;
      }
    }
  }
</style>
