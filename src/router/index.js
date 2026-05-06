import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/views/Landing.vue'
import Index from '@/views/Index.vue'
import Register from '@/views/Register.vue'
import Profile from '@/views/Profile.vue'

const routes = [
    {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: { requiresAuth: true } // 标记需要登录
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  { path: '/food', component: () => import('../views/Food.vue'), name: 'Food' },
  { path: '/forum', component: () => import('../views/Forum.vue'), name: 'Forum' },
  { path: '/culture', component: () => import('../views/Culture.vue'), name: 'Culture' },
      //  16 个城市路由
  {
    path: '/',
    component: () => import('@/layouts/CityLayout.vue'),
    children: [
      {path: 'jinan', component: () => import('@/views/citys/Jinan.vue'), name: 'Jinan'},
      {path: 'qingdao', component: () => import('@/views/citys/Qingdao.vue'), name: 'Qingdao'},
      {path: 'zibo', component: () => import('@/views/citys/Zibo.vue'), name: 'Zibo'},
      {path: 'zaozhuang', component: () => import('@/views/citys/Zaozhuang.vue'), name: 'Zaozhuang'},
      {path: 'dongying', component: () => import('@/views/citys/Dongying.vue'), name: 'Dongying'},
      {path: 'yantai', component: () => import('@/views/citys/Yantai.vue'), name: 'Yantai'},
      {path: 'weifang', component: () => import('@/views/citys/Weifang.vue'), name: 'Weifang'},
      {path: 'jining', component: () => import('@/views/citys/Jining.vue'), name: 'Jining'},
      {path: 'taian', component: () => import('@/views/citys/Taian.vue'), name: 'Taian'},
      {path: 'weihai', component: () => import('@/views/citys/Weihai.vue'), name: 'Weihai'},
      {path: 'rizhao', component: () => import('@/views/citys/Rizhao.vue'), name: 'Rizhao'},
      {path: 'linyi', component: () => import('@/views/citys/Linyi.vue'), name: 'Linyi'},
      {path: 'dezhou', component: () => import('@/views/citys/Dezhou.vue'), name: 'Dezhou'},
      {path: 'liaocheng', component: () => import('@/views/citys/Liaocheng.vue'), name: 'Liaocheng'},
      {path: 'binzhou', component: () => import('@/views/citys/Binzhou.vue'), name: 'Binzhou'},
      {path: 'heze', component: () => import('@/views/citys/Heze.vue'), name: 'Heze'},
    ]
  },
  // 预留路由（按需扩展）
  /*{ path: '/city/:name', component: () => import('../views/City.vue') },
  { path: '/spot/:name', component: () => import('../views/Spot.vue') },*/
  {
    path: '/route',
    name: 'route-planner',
    component: () => import('@/views/RoutePlanner.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})
//如果未登录，会被强制回转到登录页面
router.beforeEach((to, from, next) => {
  const isLogged = localStorage.getItem('isLogged') === 'true'

  if (to.meta.requiresAuth && !isLogged) {
    next('/')
  } else if (to.path === '/' && isLogged) {
    next('/index') // 已登录访问根路径直接跳首页
  } else {
    next()
  }
})

export default router