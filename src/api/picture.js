import request from '@/utils/request'


//显示图片数据集的封面
export function showPicture(path){
    return request({
        url:`picture/getPicture/${path}`,
        method:'get',
    })
}