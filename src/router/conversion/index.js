const conversion = [
  {
    path: '/conversion',
    name: 'conversion',
    component: () => import(/* webpackChunkName: "conversion" */'@/views/conversion/conversion'),
    meta: {
      title: '兑换',
      keepAlive: false
    }
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: () => import(/* webpackChunkName: "recharge" */'@/views/conversion/recharge'),
    meta: {
      title: '积分卡充值',
      keepAlive: false
    }
  }
]
export default conversion
