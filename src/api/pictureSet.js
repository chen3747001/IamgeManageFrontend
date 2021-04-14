import request from '@/utils/request'

//创建新的数据集
export function createPictureSet(pictureSetDTO){
    return request({
        url:'/pictureSet/create',
        method:'post',
        data:pictureSetDTO
    })
}

//显示属于我的数据集
export function showMyPictureSet(username){
    return request({
        url:'pictureSet/mySet',
        method:"get",
    })
}
