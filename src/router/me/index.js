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
  }
]
export default me
