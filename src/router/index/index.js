const index = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index/index'),
    meta: {
      title: '大积分管家'
    }
  },
  {
    path: '*',
    redirect: '/',
    meta: {
      title: '大积分管家'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index/index'),
    meta: {
      title: '大积分管家'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/index/login'),
    meta: {
      title: '大积分管家'
    }
  }
]
export default index
