const shoppingCart = [
  {
    path: '/shoppingCart',
    name: 'shoppingCart',
    component: () => import(/* webpackChunkName: "shoppingCart" */'@/views/shoppingCart/shoppingCart'),
    meta: {
      title: '购物车',
      keepAlive: true
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import(/* webpackChunkName: "pay" */'@/views/order/pay'),
    meta: {
      title: '支付结果',
      keepAlive: false
    }
  },
  {
    path: '/YesOrder',
    name: 'YesOrder',
    component: () => import(/* webpackChunkName: "YesOrder" */'@/views/order/YesOrder'),
    meta: {
      title: '订单确认',
      keepAlive: false
    }
  },
  {
    path: '/addAddress1',
    name: 'addAddress1',
    component: () => import(/* webpackChunkName: "addAddress1" */'@/views/order/addAddress'),
    meta: {
      title: '添加地址',
      keepAlive: false
    }
  }
]
export default shoppingCart
