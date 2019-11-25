<template>
  <div class="scoreDetailWrap">
    <div class="header">
      <div class="p1">
        <span class="scoreIcon"> </span>
        <span>
          我的积分:
        </span>
        <span>{{ myScore }}</span>
      </div>
      <div class="p2">
        <span>
          {{ pastDueScore }}
        </span>
        <span>
          积分即将过期，有效期至
        </span>
        <span>
          {{ pastDueDate }}
        </span>
      </div>
    </div>
    <div class="scoreListWrap">
      <div class="title">
        <span>已消费：{{ allUseScore }}</span>
        <span>已失效：{{ allPastDueScore }}</span>
      </div>
      <div class="scoreList">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="item" v-for="(item, index) in scoreList" :key="index">
            <div class="left">
              <p class="detail">
                {{ item.detail }}
              </p>
              <p class="date">
                {{ item.date }}
              </p>
            </div>
            <div class="right" :class="item.score > 0 ? 'color' : 'color_'">
              {{ String(item.score) }}
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      finished: false,
      loading: false,
      myScore: 10000,
      pastDueScore: 1200,
      pastDueDate: '2020-2-30',
      allPastDueScore: 10000,
      allUseScore: 10000,
      scoreList: [
        {
          detail: '每日签到',
          date: '2019.10.2 19:50:20',
          score: 1000
        },
        {
          detail: '每日签到',
          date: '2019.10.2 19:50:20',
          score: -1000
        },
        {
          detail: '每日签到',
          date: '2019.10.2 19:50:20',
          score: 1000
        },
        {
          detail: '每日签到',
          date: '2019.10.2 19:50:20',
          score: 2000
        },
        {
          detail: '每日签到',
          date: '2019.10.2 19:50:20',
          score: -20100
        },
        {
          detail: '每日签到',
          date: '2019.10.2 19:50:20',
          score: 1000
        },
        {
          detail: '每日签到',
          date: '2019.10.2 19:50:20',
          score: 2000
        },
        {
          detail: '每日签到',
          date: '2019.10.2 19:50:20',
          score: -20100
        }
      ]
    }
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        this.scoreList.push(
          ...[
            {
              detail: '每日签到',
              date: '2019.10.2 19:50:20',
              score: 1000
            },
            {
              detail: '每日签到',
              date: '2019.10.2 19:50:20',
              score: 2000
            },
            {
              detail: '每日签到',
              date: '2019.10.2 19:50:20',
              score: -20100
            }
          ]
        )
        this.loading = false
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
.scoreDetailWrap {
  height: 100vh;
  overflow: hidden;
  position: relative;
  .header {
    width: 100vw;
    height: 60vw;
    background: url(~@/assets/img/me/scoreBg.png) no-repeat center center;
    background-size: 100% 100%;
    padding-top: 15vw;
    .p1 {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: white;
      margin-bottom: 12px;
      .scoreIcon {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url(~@/assets/img/me/scoreIcon.png) no-repeat center center;
        background-size: 100% 100%;
        margin-right: 4px;
      }
    }
    .p2 {
      text-align: center;
      font-size: 12px;
      color: white;
    }
  }
  .scoreListWrap {
    position: absolute;
    top: 40vw;
    left: 15px;
    right: 15px;
    bottom: 0;
    overflow-y: auto;
    background: white;
    .title {
      display: flex;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #e1e1e1;
      span:nth-of-type(2) {
        margin-left: 20px;
      }
    }
    .scoreList {
      overflow-y: auto;
      .item {
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e1e1e1;
        .detail {
          font-size: 16px;
          color: #333333;
          line-height: 30px;
        }
        .date {
          font-size: 13px;
          color: #999999;
          line-height: 20px;
        }
        .right {
          font-size: 16px;
        }
        .color {
          color: #00aeff;
        }
        .color_ {
          color: #333333;
        }
      }
    }
  }
}
</style>
