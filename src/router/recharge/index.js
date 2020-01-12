const index = [
  {
    path: '/eBi',
    name: 'eBi',
    component: () => import(/* webpackChunkName: "eBi" */'@/views/recharge/eBi'),
    meta: {
      title: 'e币充值',
      keepAlive: false
    }
  },
  {
    path: '/oilCard',
    name: 'oilCard',
    component: () => import(/* webpackChunkName: "oilCard" */'@/views/recharge/oilCard'),
    meta: {
      title: '油卡充值',
      keepAlive: false
    }
  },
  {
    path: '/rechargeIndex',
    name: 'rechargeIndex',
    component: () => import(/* webpackChunkName: "rechargeIndex" */'@/views/recharge/index'),
    meta: {
      title: '充值中心',
      keepAlive: false
    }
  }
]
export default index
