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
  //访问用户的数据集页面
  {
    name:'userData',
    path:'/userData/:username/pictureSet',
    component: () => import('@/views/userData/pictureSet'),
    meta:{title:'我的'}
  },
  //创建数据集页面
  {
    name:"createPictureSet",
    path:"/pictureSet/create",
    component:()=> import('@/views/pictureSet/Create.vue'),
    meta:{title:"创建数据集"}
  },
  {
    path:'/error',
    name:'error',
    component:()=>import('@/views/error/ErrorRequest'),
    meta:{title:'404-Notfound'}
  },
  // 用户输入其他路由（无效路由），重定向到404-error页面
  {
    path:'/*',
    redirect:'/error',
    hidden:true
  }
  
]

//重写push功能，出现异常不再捕捉
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
