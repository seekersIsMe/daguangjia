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
  },
  {
    path: '/proList',
    name: 'proList',
    component: () => import('@/views/index/proList'),
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/proDetail',
    name: 'proDetail',
    component: () => import('@/views/index/proDetail'),
    meta: {
      title: '商品详情'
    }
  }
]
export default index
