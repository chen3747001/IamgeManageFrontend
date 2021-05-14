import request from '@/utils/request'

//根据团队名返回成员信息
export function getMemberByTeamName(pageNo,size,teamName){
    return request({
        url:"/teamMember/getTeamByMemberName",
        method:"get",
        params:{pageNo:pageNo,size:size,teamName:teamName}
    })
}