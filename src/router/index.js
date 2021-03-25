import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component:()=>import('@/views/Home')
  },
  //注册
  {
    path:'/register',
    name:'register',
    component:()=>import('@/views/auth/Register'),
    meta: { title: '注册' }
  },
  //登录
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/auth/Login'),
    meta: { title: '登录' }
  },
  {
    path:'/404',
    name:'404',
    component:()=>import('@/views/error/ErrorRequest'),
    meta:{title:'404-Notfound'}
  },
  // 用户输入其他路由（无效路由），重定向到404页面
  {
    path:'/*',
    redirect:'/404',
    hidden:true
  }
  
]

const router = new VueRouter({
  routes
})

export default router
