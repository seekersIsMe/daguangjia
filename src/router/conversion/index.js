const conversion = [
  {
    path: '/conversion',
    name: 'conversion',
    component: () => import(/* webpackChunkName: "conversion" */'@/views/conversion/conversion'),
    meta: {
      title: '兑换',
      keepAlive: false
    }
  }
]
export default conversion
