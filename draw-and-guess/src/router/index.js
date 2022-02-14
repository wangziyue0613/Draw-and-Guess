import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login/index') },
  { path: '/home', component: () => import('@/views/Game/index') }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const nickname = localStorage.getItem('nickname')

  // 缓存中有昵称
  if (nickname) {
    // 当前是登录页
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      next()
    }
  } else {
    // 当前是登录页
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router
