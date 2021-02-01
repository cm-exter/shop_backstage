import Vue from 'vue'
import VueRouter from 'vue-router'
//解决避免对当前位置的冗余导航问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
    meta: { title: '主页' },
    redirect : '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/index/index.vue'),
        meta: { title: '首页' },
      },
      {
        path: '/category_manage',
        name: 'category_manage',
        component: () => import('../views/shop/category_manage.vue'),
        meta: { title: '品类管理' },
      },
      {
        path: '/shop_manage',
        name: 'shop_manage',
        component: () => import('../views/shop/shop_manage.vue'),
        meta: { title: '商品管理' },
      },
      {
        path: '/order_manage',
        name: 'order_manage',
        component: () => import('../views/order/order_manage.vue'),
        meta: { title: '订单管理' },
      },
    ]

  },

]

const router = new VueRouter({
  routes
})

export default router
