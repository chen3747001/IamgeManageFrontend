import request from '@/utils/request'

//根据团队名返回成员信息(包括简介，头像)Page
export function getMemberByTeamName(pageNo,size,teamName){
    return request({
        url:"/teamMember/getTeamByMemberName",
        method:"get",
        params:{pageNo:pageNo,size:size,teamName:teamName}
    })
}

//根据团队名返回成员信息List
export function getMemberByTeamNameList(teamName){
    return request({
        url:"/teamMember/getTeamByMemberNameList",
        method:"get",
        params:{teamName:teamName}
    })
}

//修改团队中成员的权力
export function updatePower(teamMember){
    return request({
        url:"/teamMember/updatePower",
        method:"post",
        data:teamMember
    })
}

//删除成员
export function deleteMember(teamName,memberName){
    return request({
        url:"teamMember/deleteMember",
        method:"post",
        params:{teamName:teamName,memberName:memberName}
    })
}