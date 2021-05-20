import request from '@/utils/request'

//查询该收藏是否存在
export function isExisted(username,setname){
    return request({
        url:"/collect/isExisted",
        method:"post",
        params:{
            username:username,
            setname:setname,
        }
    })
}

//新建一个收藏
export function createCollect(username,setname){
    return request({
        url:"/collect/createCollect",
        method:"post",
        params:{
            username:username,
            setname:setname,
        }
    })
}

//删除一个收藏
export function deleteCollect(username,setname){
    return request({
        url:"/collect/deleteCollect",
        method:"post",
        params:{
            username:username,
            setname:setname,
        }
    })
}

//分页展示用户收藏的数据集
export function showCollectPage(userName,pageNo,pageSize){
    return request({
        url:"/collect/showCollects",
        method:"get",
        params:{
            user:userName,
            pageNo:pageNo,
            size:pageSize,
        }
    })
}