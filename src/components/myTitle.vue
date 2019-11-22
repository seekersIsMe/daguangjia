<template>
  <div class="titleWrpa">
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
  .titleWrpa{
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
        width: 6px;
        background-color: #00AEFF;
        border-radius: 3px;
        margin-left: rem(6)
      }
      .title{
        font-size: 14px;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height: 36px;
      }
    }
  }
</style>