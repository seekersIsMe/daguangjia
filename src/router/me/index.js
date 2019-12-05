const me = [
  {
    path: '/me',
    name: 'me',
    component: () => import('@/views/me/me'),
    meta: {
      title: '个人中心',
      keepAlive: false
    }
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/me/info'),
    meta: {
      title: '个人中心',
      keepAlive: false
    }
  },
  {
    path: '/scoreDetail',
    name: 'scoreDetail',
    component: () => import('@/views/me/scoreDetail'),
    meta: {
      title: '积分明细',
      keepAlive: false
    }
  },
  {
    path: '/addressList',
    name: 'addressList',
    component: () => import('@/views/me/addressList'),
    meta: {
      title: '收货地址',
      keepAlive: false
    }
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: () => import('@/views/me/addAddress'),
    meta: {
      title: '新增收获地址',
      keepAlive: false
    }
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import(/* webpackChunkName: "orderList" */'@/views/order/orderList'),
    meta: {
      title: '我的订单',
      keepAlive: false
    }
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: () => import(/* webpackChunkName: "orderDetail" */'@/views/order/orderDetail'),
    meta: {
      title: '订单详情',
      keepAlive: false
    }
  }
]
export default me
