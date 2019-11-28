<template>
  <div class="addAddress">
      <div class="header">
        <van-icon name="arrow-left" @click="goBack" />收货地址新增
      </div>
    <van-address-edit
      :area-list="areaList"
      :show-postal="false"
      :is-saving="isSaving"
      :address-info="addressInfo"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      :tel-validator="telValidator"
    />
  </div>
</template>
<script>
import areaList from '@/assets/json/area.js'
const updateAddressUrl = '/sysUser/saveOrUpdateAddress'
export default {
  data () {
    return {
      areaList: Object.freeze(areaList),
      searchResult: [],
      isSaving: false,
      addressId: '',
      params: {},
      addressInfo: {}

    }
  },
  created () {
    this.addressInfo = this.$route.query || {}
    this.addressId = this.addressInfo.id || ''
    console.log(this.$route.query)
  },
  methods: {
    onSave (val) {
      this.isSaving = true
      this.getParams(val)
      this.updateAddress()
    },
    updateAddress () {
      this.$axios({
        url: updateAddressUrl,
        method: 'post',
        params: this.params
      }, res => {
        if (res.status === 10001) {
          this.isSaving = false
          this.$router.push({
            path: '/addressList'
          })
        } else {
          this.isSaving = true
          this.$toast(res.msg)
        }
      })
    },
    getParams (val) {
      let obj = {
        uid: localStorage.getItem('userId'),
        nickName: val.name,
        phone: val.tel,
        province: val.province,
        city: val.city,
        district: val.county,
        address: val.addressDetail,
        provinceCode: val.areaCode,
        isDefault: val.isDefault ? 1 : 0
      }
      if (this.addressId) {
        obj = Object.assign(obj, {
          id: this.addressId
        })
      }
      this.params = obj
    },
    onDelete () {},
    onChangeDetail (val) {
      // if (val) {
      //   this.searchResult = [
      //     {
      //       name: '黄龙万科中心',
      //       address: '杭州市西湖区'
      //     }
      //   ]
      // } else {
      //   this.searchResult = []
      // }
    },
    telValidator (val) {
      return /^1[3456789]\d{9}$/.test(val)
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
 .header {
    position: relative;
    line-height: 40px;
    height: 40px;
    color: #000000;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    .van-icon {
      position: absolute;
      left: 15px;
      font-size: 18px;
      margin-top: 11px;
    }
  }
/deep/.van-address-edit {
  .van-button {
    border-radius: 5px;
  }
  .van-button--danger {
    background-color: #00aeff;
    border-color: #00aeff;
  }
}
</style>
