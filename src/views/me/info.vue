<template>
  <div class="infoWrap">
    <div class="aiv item">
      <van-cell title="头像">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <div slot="right-icon" class="right">
          <img class="img" :src="imgSrc" alt="" />
          <van-icon name="arrow" />
        </div>
      </van-cell>
    </div>
    <div class="item nickname">
      <van-cell title="昵称" is-link>
        <van-field
          slot="right-icon"
          v-model="nickname"
          placeholder="请输入用户名"
        />
      </van-cell>
    </div>
    <div class="item telNum">
      <van-cell title="手机号" :value="telNum" />
    </div>
    <div class="item address">
      <van-cell title="所属地区" :value="address" is-link @click="selectArea" />
    </div>
    <div class="item company">
      <van-cell title="企业名称" :value="company" />
    </div>
    <van-area
      :area-list="areaList"
      value="120101"
      title="选择地址"
      v-show="isShowArea"
      @confirm="select"
      @cancel="cancelArea"
    />
    <van-row>
      <van-col span="18" offset="3">
        <van-button class="w100" type="primary" color="#00AEFF" @click="save">保存</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import areaList from '@/assets/json/area.js'
export default {
  data() {
    return {
      nickname: '向阳的微笑',
      telNum: 1534524525,
      address: '广东省广州市天河区',
      company: '向阳集团',
      imgSrc: '',
      areaList: Object.freeze(areaList),
      isShowArea: false
    }
  },
  methods: {
    selectArea() {
      if (this.isShowArea) {
        return
      }
      this.isShowArea = true
    },
    cancelArea() {
      this.isShowArea = false
    },
    select(val) {
      // let areaList = ['北京市', '天津市', '上海市', '重庆市']
      let areaListCode = ['110000', '120000', '310000', '500000']
      // 北京市，天津市，上海市，重庆市，
      this.isShowArea = false
      this.address = val
        .reduce((a, b) => {
          if (!areaListCode.includes(b.code)) {
            a.push(b.name)
          }
          return a
        }, [])
        .join('')
      console.log(val)
      console.log(this.address)
    },
    save() {}
  }
}
</script>
<style lang="scss" scoped>
.infoWrap {
  height: 100vh;
  overflow: hidden;
  background: #f7f7f7;
  position: relative;
  .item {
    margin-top: 10px;
  }
  .van-cell {
    /deep/ .van-cell__title {
      color: #333333;
      font-size: 16px;
    }
    /deep/ .van-cell__value {
      color: #666666;
      font-size: 15px;
    }
  }
  .aiv {
    .img {
      display: inline-block;
      width: 47px;
      height: 47px;
    }
    .van-cell {
      height: 65px;
      /deep/ .van-cell__title {
        display: flex;
        align-items: center;
        color: #333333;
        font-size: 16px;
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
  }
  .nickname {
    .van-cell.van-field {
      flex: 1;
      padding: 0;
      text-align: right;
      /deep/ input {
        text-align: right;
        text-align: end;
      }
    }
  }
  .van-picker {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .w100{
    width: 100%;
    border-radius: 5px;
    margin-top: 30px;
  }
}
</style>
