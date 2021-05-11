import request from '@/utils/request'

//显示对应数据集的所有图片信息
export function getPictureInformation(name){
    return request({
        url:`picture/getPictureInformation/${name}`,
        method:'get',
    })
}

//删除选中的图片
export function deletePictureList(deletePictureDTO){
    return request({
        method:'post',
        url:'picture/deletePictureList',
        data:deletePictureDTO,
        // headers:{
        //     'Content-Type' : 'application/json'
        // }
        // headers: {
        //     'Content-Type': 'application/json;charset=UTF-8'
        //   }
    })
}

//显示头像
export function showAvatar(path){
    return request({
        url:`picture/getAvatar/${path}`,
        method:'get',
    })
}

//显示图片
export function showPicture(path){
    return request({
        url:`picture/getPicture/${path}`,
        method:'get',
    })
}

//上传图片
export function uploadPicture(pictureDataDTO){
    return request({
        method:'post',
        url:'picture/upload',
        data:pictureDataDTO,
        // headers: {
        //     'Content-Type': 'application/json;charset=UTF-8'
        //   }
    })
}

//修改头像(用户/团队)
export function updateAvatar(changeAvatarDTO){
    return request({
        method:'post',
        url:'picture/updateAvatar',
        data:changeAvatarDTO
    })
}