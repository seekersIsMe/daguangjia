<template>
  <div class="addressListWrap">
    <van-sticky>
      <div class="header bgW">
        收货地址
      </div>
    </van-sticky>
    <div class="addressList bgW">
      <div v-if="addressList.length>0">
        <van-radio-group v-model="radio" @change='changeAddress'>
          <van-swipe-cell v-for="(item,index) in addressList" :key="index">
            <div class="item">
              <div class="body" @click="selectAds(item)">
                <div class="p1">
                  <span class="name w100">{{ item.nickName }}</span>
                  <span class="tel">{{item.tel}}</span>
                  <span class="default" v-if="item.isDefault">默认</span>
                </div>
                <div class="p2">
                  <span class="addressTitle w100">收货地址</span>
                  <span class="adress">{{ getAddress(item) }}</span>
                </div>
              </div>
              <div class="icon">
                <van-radio :name="index"/>
              </div>
            </div>
          </van-swipe-cell>
        </van-radio-group>
      </div>
    </div>
    <div class="addBtn">
      <van-button class="addAds" type="primary" color="#00AEFF" @click="addAddress">添加地址</van-button>
      <van-button class="comfi" type="primary" color="#00AEFF" @click="saveAddress">确定</van-button>
    </div>
  </div>
</template>
<script>
const getAddressListUrl = '/sysUser/getAddress'
export default {
  props: {
    show: Boolean
  },
  data () {
    return {
      radio: '',
      userId: localStorage.getItem('userId'),
      isSelect: false,
      addressList: [
        // {
        //   nick_name: '',
        //   phone: '',
        //   address: '',
        //   province: '',
        //   city: '',
        //   district: '',
        //   is_default: true
        // }
      ]
    }
  },
  created () {
    this.getAddressList()
  },
  methods: {
    saveAddress () {
      this.$emit('close')
    },
    changeAddress () {
      let selectAddress = this.addressList[this.radio]
      this.$emit('selectAddress', selectAddress)
    },
    getAddressList () {
      this.$axios(
        {
          url: getAddressListUrl,
          params: {
            uid: this.userId
          },
          method: 'post'
        },
        res => {
          if (res.status === 10001) {
            this.addressList = res.data.info || []
          } else {
            this.$toast(res.msg)
          }
        }
      )
    },
    getAddress (item) {
      let areaList = ['北京市', '天津市', '上海市', '重庆市']
      if (areaList.includes(item.province)) {
        return item.city + item.district + item.address
      } else {
        return item.province + item.city + item.district + item.address
      }
    },
    addAddress () {
      this.$emit('addAds')
      // this.$router.push({
      //   path: '/addAddress1'
      // })
    },
    selectAds (item) {
      this.$emit('select', item)
    },
    editAddress (item) {
      this.$router.push({
        path: '/addAddress1',
        query: {
          id: item.id,
          name: item.nickName,
          tel: item.phone,
          province: item.province,
          city: item.city,
          county: item.district,
          addressDetail: item.address,
          areaCode: String(item.provinceCode),
          isDefault: item.isDefault
        }
      })
    }
  },
  watch: {
    show () {
      this.getAddressList()
    }
  }
}
</script>
<style lang="scss" scoped>
.addressListWrap {
  /*iphone XR*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    height: calc(100vh - 34px);
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
    height: calc(100vh - 34px);
  }
  /*iphone XMAX*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    height: calc(100vh - 34px);
  }
  /* iphone X/XS */
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    height: calc(100vh - 34px);
  }
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
  background: #f7f7f7;

  .bgW {
    background: white;
  }
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
  .addressList {
    // height: 100%;
    overflow-y: auto;
    margin-top: 10px;
  }
  /deep/ .van-swipe-cell {
    .van-swipe-cell__right {
      display: flex;
      align-items: center;
    }
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 10px 15px;
    .body {
      flex: 1;
      .w100 {
        width: 60px;
        display: inline-block;
      }
      .p1 {
        font-size: 15px;
        color: #333333;
        line-height: 24px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .default {
          width: 45px;
          height: 18px;
          line-height: 18px;
          font-size: 12px;
          color: white;
          background: linear-gradient(to right, #5ddb86, #24cc36);
          text-align: center;
          margin-left: 20px;
        }
      }
      .p2 {
        color: #666666;
        font-size: 12px;
      }
    }
    .icon {
      display: flex;
      align-items: center;
      color: #00aeff;
    }
  }
  .addBtn {
    padding: 0 20px;
    position: fixed;
    bottom: 15px;
    left: 0;
    right: 0;
    .van-button {
      height: 45px;
      width: 100%;
      line-height: 45px;
      color: white;
      font-size: 16px;
      border-radius: 5px;
    }
  }
}
.comfi{
  margin-top: 20px;
}
</style>
