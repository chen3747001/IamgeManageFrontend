import request from '@/utils/request'

//分页组件
export function getList(pageNo,size,tab){
    return request({
        url:'/post/list',
        method:'get',
        params:{pageNo:pageNo,size:size,tab:tab}
    })
}
