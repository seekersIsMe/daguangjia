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
  }
]
export default me
