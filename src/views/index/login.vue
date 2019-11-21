<template>
  <div class="login">
    <van-cell-group>
      <van-field
        v-model="telNum"
        clearable
        label="手机号："
        right-icon="question-o"
        placeholder="请输入手机号"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="vailCode"
        label="验证码："
        placeholder="请输入验证码"
        clearable
        center
      >
      <span slot="button" class="getCode" @click="getCode">
        获取验证码
      </span>
      </van-field>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      telNum: '',
      vailCode: ''
    }
  },
  methods: {
    getCode () {}
  }
}
</script>
<style lang="scss">
  .getCode{
    color: red
  }
</style>
