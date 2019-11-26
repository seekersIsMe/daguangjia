const shoppingCart = [
  {
    path: '/shoppingCart',
    name: 'shoppingCart',
    component: () => import('@/views/shoppingCart/shoppingCart'),
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/order/pay'),
    meta: {
      title: '支付结果'
    }
  },
  {
    path: '/YesOrder',
    name: 'YesOrder',
    component: () => import('@/views/order/YesOrder'),
    meta: {
      title: '订单确认'
    }
  }
]
export default shoppingCart
