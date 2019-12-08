<template>
  <div class="infoWrap">
    <div class="header bgW"><van-icon @click="goBack" name="arrow-left" />个人中心</div>
    <div class="aiv item">
      <van-cell title="头像">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <div slot="right-icon" class="right" @click="selectPic">
          <img class="img" :src="'http://47.107.110.186:8084'+imgSrc" alt="" />
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
        <van-button class="w100" type="primary" color="#00AEFF" @click="save"
          >保存</van-button
        >
      </van-col>
    </van-row>
    <!-- 拍照选择图片 -->
    <van-overlay :show="isShowPic" @click="isShowPic = false">
      <div class="picWrap" @click.stop>
        <div class="bodyPic">
          <van-button type="default" @click="gotoAlbum">
            <div class="btnWrap">
              <span class="pic1"></span>
              <span>
                相册
              </span>
            </div>
          </van-button>
          <van-button type="default" @click="takePic">
             <div class="btnWrap">
              <span class="pic2"></span>
              <span>
                拍照
              </span>
            </div>
          </van-button>
        </div>
        <div class="cancelPic">
          <van-button type="default">取消</van-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import areaList from '@/assets/json/area.js'
export default {
  data () {
    return {
      nickname: '向阳的微笑',
      telNum: 1534524525,
      address: '广东省广州市天河区',
      company: '向阳集团',
      imgSrc: '',
      areaList: Object.freeze(areaList),
      isShowArea: false,
      isShowPic: false
    }
  },
  methods: {
    selectArea () {
      if (this.isShowArea) {
        return
      }
      this.isShowArea = true
    },
    cancelArea () {
      this.isShowArea = false
    },
    select (val) {
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
    save () {},
    selectPic () {
      this.isShowPic = true
    },
    gotoAlbum () {},
    takePic () {},
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.infoWrap {
  height: 100vh;
  overflow: hidden;
  background: #f7f7f7;
  position: relative;
  .bgW{
    background: white;
  }
  .header {
  position: relative;
  text-align: center;
  height: 40px;
  line-height: 40px;
  .van-icon {
    position: absolute;
    top: 11px;
    left: 10px;
  }
}
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
  .w100 {
    width: 100%;
    border-radius: 5px;
    margin-top: 30px;
  }
}
.picWrap {
  height: 100%;
  position: relative;
  .van-button {
    width: 100%;
  }
  .bodyPic {
    position: absolute;
    bottom: 90px;
    left: 12px;
    right: 12px;
    background: white;
    border-radius: 5px;
  }
  .cancelPic {
    position: absolute;
    bottom: 30px;
    left: 12px;
    right: 12px;
  }
  .btnWrap{
    color: #00AEFF;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    .pic1,.pic2{
      display: inline-block;
      width: 25px;
      height: 20px;
      margin-right: 4px;
    }
    .pic1{
      background: url(~@/assets/img/me/pic1.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .pic2{
      background: url(~@/assets/img/me/pic2.png) no-repeat center center;
      background-size: 100% 100%;
    }
  }
}
.cancelPic{
  .van-button{
    border-radius: 5px;
  }
}
</style>
