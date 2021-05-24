import request from '@/utils/request'

export function getOperations(setName){
    return request({
        url:"/setOperation/getOperationsBySetName",
        method:"get",
        params:{
            setName:setName,
        }
    })
}