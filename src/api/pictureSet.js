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


//显示属于我的数据集
//展示列表 pageNo 页号 size 尺寸 tab 显示那种主题
export function showMyPictureSetTest(pageNo,size,tab){
    return request({
        url:'pictureSet/mySetTest',
        method:"get",
        params:{pageNo:pageNo,size:size,tab:tab}
    })
}