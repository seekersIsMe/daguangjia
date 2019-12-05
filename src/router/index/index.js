const index = [
  {
    path: '',
    redirect: '/index',
    meta: {
      title: '大积分管家',
      keepAlive: true
    }
  },
  {
    path: '*',
    redirect: '/index',
    meta: {
      title: '大积分管家',
      keepAlive: true
    }
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */'@/views/index/index'),
    meta: {
      title: '大积分管家',
      keepAlive: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'@/views/index/login'),
    meta: {
      title: '大积分管家',
      keepAlive: false
    }
  },
  {
    path: '/proList',
    name: 'proList',
    component: () => import(/* webpackChunkName: "proList" */'@/views/index/proList'),
    meta: {
      title: '商品列表',
      keepAlive: true
    }
  },
  {
    path: '/proDetail',
    name: 'proDetail',
    component: () => import(/* webpackChunkName: "proDetail" */'@/views/index/proDetail'),
    meta: {
      title: '商品详情',
      keepAlive: false
    }
  }
]
export default index
