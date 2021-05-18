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
export function showMyPictureSetTest(pageNo,size,tab,scenario,dataKind,searchName){
    return request({
        url:'pictureSet/mySetTest',
        method:"get",
        params:{pageNo:pageNo,size:size,tab:tab,scenario:scenario,dataKind:dataKind,searchName:searchName}
    })
}

//显示公共数据集
//展示列表 pageNo 页号 size 尺寸 tab 显示那种主题
export function showPublicPictureSetTest(pageNo,size,tab,scenario,dataKind,searchName){
    return request({
        url:'pictureSet/showPublicSet',
        method:"get",
        params:{pageNo:pageNo,size:size,tab:tab,scenario:scenario,dataKind:dataKind,searchName:searchName}
    })
}

//获得对应名称的数据集的信息
export function getSetInformationByName(name){
    return request({
        url:'pictureSet/getSetInformationByName',
        method:'get',
        params: {
            setName: name
          }
    })
}

//下载对应数据集的信息
export function downloadSet(name){
    return request({
        url:'pictureSet/downloadSet',
        method:'post',
        params:{
            setName:name
        }
    })
}

//修改数据集的信息
export function updateSetInformation(setName,bio,scenario,dataKind){
    return request({
        url:"/pictureSet/updateSetInformation",
        method:"post",
        params:{
            setName:setName,
            bio:bio,
            scenario:scenario,
            dataKind:dataKind,
        }
    })
}