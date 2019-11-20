const index = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index/index')
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index/index')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/index/login')
  }
]
export default index
