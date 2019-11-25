const me = [
  {
    path: '/me',
    name: 'me',
    component: () => import('@/views/me/me'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/me/info'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/scoreDetail',
    name: 'scoreDetail',
    component: () => import('@/views/me/scoreDetail'),
    meta: {
      title: '积分明细'
    }
  },
  {
    path: '/addressList',
    name: 'addressList',
    component: () => import('@/views/me/addressList'),
    meta: {
      title: '收货地址'
    }
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: () => import('@/views/me/addAddress'),
    meta: {
      title: '新增收获地址'
    }
  }
]
export default me
