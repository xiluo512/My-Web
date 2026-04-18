import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/main' },
  { path: '/main', component: () => import('../views/MainPage.vue'), name: 'MainPage' },
  { path: '/index', component: () => import('../views/Index.vue'), name: 'Index' },
  { path: '/food', component: () => import('../views/Food.vue'), name: 'Food' },
  { path: '/forum', component: () => import('../views/Forum.vue'), name: 'Forum' },
  { path: '/login', component: () => import('../views/Login.vue'), name: 'Login' },
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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router