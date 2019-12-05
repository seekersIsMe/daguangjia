const type = [
  {
    path: '/type',
    name: 'type',
    component: () => import(/* webpackChunkName: "type" */'@/views/type/type'),
    meta: {
      title: '分类',
      keepAlive: false
    }
  }
]
export default type
