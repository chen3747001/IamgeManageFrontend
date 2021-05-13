import request from '@/utils/request'

//新建团队
export function createTeam(team){
    return request({
        url:"/team/createTeam",
        method:"post",
        data:team,

    })
}

//根据用户名返回团队信息
export function getTeamByMemberName(){
    return request({
        url:"/team/getTeamByMemberName",
        method:"get"
    })
}


//根据用户名返回团队信息
//展示列表 pageNo 页号 size 尺寸 
export function getTeamByMemberNamePage(pageNo,size){
    return request({
        url:'/team/getTeamByMemberNamePage',
        method:"get",
        params:{pageNo:pageNo,size:size}
    })
}

//根据团队名返回团队信息
export function getTeamByTeamName(teamName){
    return request({
        url:"/team/getTeamByTeamName",
        method:"get",
        params:{teamName:teamName}
    })
}

//修改团队信息
export function updateTeamInformation(teamName,bio,email){
    return request({
        url:"/team/updateInformation",
        method:"post",
        params:{teamName:teamName,bio:bio,email:email}
    })
}