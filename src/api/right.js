import request from '@/utils/request'

//返回该用户在该数据集中的权限
export function getRightSet(setName,ownerName){
    return request({
        url:"/right/getRightInSet",
        method:"get",
        params:{
            setName:setName,
            ownerName:ownerName,
        }
    })
}

//返回该用户在该团队中的权限
export function getRightInTeam(teamName){
    return request({
        url:"/right/getRightInTeam",
        method:"get",
        params:{
            teamName:teamName,
        }
    })
}