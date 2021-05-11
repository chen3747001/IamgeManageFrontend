import request from '@/utils/request'

//用户注册
export function userRegister(userDTO){
    return request({
        url:'/user/register',
        method:'post',
        data: userDTO,
    })
}

//用户登录
export function login(data) {
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
}

//登录后获取用户信息
export function getUserInfo(){
    return request({
      url:'/user/info',
      method:'get'
    })
  }

//退出登录功能
export function logout() {
    return request({
      url: '/user/logout'
    })
} 

//修改用户信息
export function updateUserInformation(updateUserDTO){
    return request({
      url:"/user/updateUserInformation",
      method:"post",
      data:updateUserDTO
    })
}



