<template>
<div class="rechargeWrap">
  <van-field
    v-model="code"
    required
    label="券码"
    type='number'
    placeholder="请输入16位券码"
  />

  <van-field
    v-model="password"
    type="password"
    label="密码"
    placeholder="请输入安全码（在卡片背面右下方）"
    required
  />
<p class="tip">提示：请输入e券积分上的密码以及卡片背面右下方4位数字的安全码进行充值</p>
<van-button color="#ff343d" @click="chargeIntegralUrl">充值</van-button>
</div>
</template>
<script>
const chargeIntegralUrl = '/sysUser/chargeIntegral'
export default {
  data () {
    return {
      code: '',
      password: '',
      userId: localStorage.getItem('userId')
    }
  },
  methods: {
    chargeIntegralUrl () {
      if (this.code === '' || this.password === '') {
        this.$toast('请输入券码和安全码')
        return
      }
      this.$axios({
        url: chargeIntegralUrl,
        method: 'post',
        params: {
          uid: this.userId,
          ticketNo: this.code,
          secret: this.password
        }
      }, res => {
        if (res.status === 10001) {
          this.$toast('充值成功')
        } else {
          this.$toast(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.rechargeWrap{
    padding: 10px;
    .tip{
        margin-top: 10px;
        text-align: left;
        font-size: 12px;
        color: #de5d6d;
        line-height: 20px;
    }
    .van-button{
        margin-top: 20px;
        width: 100%;
    }
}
</style>
