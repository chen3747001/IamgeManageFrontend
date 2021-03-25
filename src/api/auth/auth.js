import request from '@/utils/request'

export function userRegister(userDTO){
    return request({
        url:'/user/register',
        method:'post',
        data: userDTO,
    })
}