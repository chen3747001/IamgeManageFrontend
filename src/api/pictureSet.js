import request from '@/utils/request'

//创建新的数据集
export function createPictureSet(pictureSetDTO){
    return request({
        url:'/pictureSet/create',
        method:'post',
        data:pictureSetDTO
    })
}