<template>
  <div class="payWrap">
    <div class="header bgW">
      <van-icon @click="goBack" name="arrow-left" />我的订单
    </div>
    <div class="body">
      <div class="success">
        <div class="bgIcon"></div>
        <p>
          订单支付成功
        </p>
      </div>
      <div class="fail">
        <div class="bgIcon"></div>
        <p>
          支付失败
        </p>
      </div>
    </div>
    <div class="btn">
      <van-button type="primary" color="#00AEFF">查看订单</van-button>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped></style>
