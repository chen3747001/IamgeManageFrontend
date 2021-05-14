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
    component:()=> import('@/views/pictureSet/Create'),
    meta:{title:"创建数据集"}
  },
  //数据集详情页面
  {
    name:"PictureSetDetail",
    path:"/pictureSet/detail/:SetName",
    component:()=>import('@/views/pictureSet/Detail'),
    meta:{title:"数据集详情页面"}
  },
  //图片数据管理页面
  {
    name:"ManageData",
    path:"/pictureSet/manageData/:SetName",
    component:()=>import('@/views/pictureSet/ManageData'),
    meta:{title:"管理数据页面"}
  },
  //上传图片数据页面
  {
    name:"UploadData",
    path:"/pictureSet/uploadData/:SetName",
    component:()=>import('@/views/pictureSet/UploadData'),
    meta:{title:"管理数据页面"}
  },
  //个人主页页面
  {
    name:"UserHomePage",
    path:"/user/homePage",
    component:()=>import('@/views/userData/HomePage'),
    meta:{title:"个人中心"}
  },
  //个人信息修改页面
  {
    name:"ChangeMessage",
    path:"user/changeMessage",
    component:()=>import('@/views/userData/ChangeMessage'),
    meta:{title:"个人信息修改"}
  },
  //新建团队页面
  {
    name:"createTeam",
    path:"team/createTeam",
    component:()=>import('@/views/team/CreateTeam'),
    meta:{title:"新建团队"},
  },
  //团队详情页面
  {
    name:"teamHomePage",
    path:"team/homePage",
    component:()=>import('@/views/team/HomePage'),
    meta:{title:"团队详情页面"},
  },
  //团队信息修改页面
  {
    name:"teamChangeMessage",
    path:"team/changeMessage",
    component:()=>import('@/views/team/ChangeMessage'),
    meta:{title:"团队信息修改"}
  },
  //跳转到管理成员页面
  {
    name:"teamMemberManage",
    path:"team/memberManage",
    component:()=>import('@/views/team/MemberManage'),
    meta:{title:"管理成员页面"}
  },
  //请求错误页面
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
