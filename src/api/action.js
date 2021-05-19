import request from '@/utils/request'

//邀请加入
export function inviteJoin(sender,receiver,object) {
    return request({
        url:"/action/inviteJoin",
        method:"post",
        params:{
            sender:sender,
            receiver:receiver,
            object:object,
        }
    })
}

//显示与自己有关的信息
export function showAction(name){
    return request({
        url:"/action/showAction",
        method:"get",
        params:{
            name:name,
        }
    })
}

//分页显示与自己有关的信息（未处理的）
export function showNotSolvedPageAction(pageNo,size,name){
    return request({
        url:"/action/showNotSolvedPageAction",
        method:"get",
        params:{
            pageNo:pageNo,
            size:size,
            name:name,
        }
    })
}

//分页显示与自己有关的信息（已处理的）
export function showSolvedPageAction(pageNo,size,name){
    return request({
        url:"/action/showSolvedPageAction",
        method:"get",
        params:{
            pageNo:pageNo,
            size:size,
            name:name,
        }
    })
}

//处理请求
export function dealAction(id,result){
    return request({
        url:"/action/dealAction",
        method:"post",
        params:{
            id:id,
            result:result,
        }
    })
}