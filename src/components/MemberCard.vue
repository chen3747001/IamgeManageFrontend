<template>
    <div class="card">
        <div class="avatar">
            <figure class="image  is-3by3" style="width:80px;margin-left:20px;margin-top:10px">
                    <img :src="AvatarSrc" class="imageshow">
            </figure>
            
        </div>
        <div class="introduction">
            <p style="font-weight:400">{{item.memberName}}</p>
            <p style="font-weight:100">{{item.bio}}</p>
        </div>
    </div>
</template>

<script>
import {showAvatar} from "@/api/picture"
export default {
    name:"memberCard",
    props:{
      item:Object
    },
    data(){
        return{
            AvatarData:{},
            AvatarSrc:null,
        }
    },
    watch: {
    item: {
        immediate: true,
        handler (val) {
            this.loadAvatar();
        },
        deep: true
    }
    },
    methods:{
        //显示图片数据集的封面
        loadAvatar(){
            showAvatar(this.item.avatar).then((res)=>{
                const{data}=res
                this.AvatarData=data

                console.log("=  =   set name is :"+this.item.name+" , picture name is: "+this.AvatarData.picture_name+", its detail data is:")
                console.log(data)

                this.AvatarSrc='data:image/'+this.AvatarData.picture_kind+';base64,'+this.AvatarData.picture_detail
            })
        },
    }
}
</script>

<style scoped>
    .card{
        width:100%;
        height: 100px;
        margin-left:0%;
        margin-top: 20px;
        background-color: rgba(188, 238, 238, 0.3);
 	    border-radius: 10px;
        border: 5px;
    }
    
    .avatar{
        width:15%;
        height: 100px;
        float: left;
    }

    .picture{
        width:100px;
    }

    .introduction{
        margin-top: 20px;
        width: 85%;
        height: 100px;
        float: left;
    }

    .card:hover{
        box-shadow: 5px 5px 5px 10px rgba(3, 3, 3, 0.2); 
            /* 盒子向上移动效果，改变上外边距 */
        
    }

    /* 添加了移动到该card后，图片放大效果 */
    .card:hover .imageshow{
        transition: .5s transform;
        transform: scale(1.25);
    }

</style>
