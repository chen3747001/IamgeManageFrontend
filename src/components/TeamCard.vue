<template>
    <div class="main">
        <div class="avatar">
            <figure class="image  is-3by3" style="width:80px">
                    <img :src="AvatarSrc">
            </figure>
        </div>
        <div class="introduction">
            <p style="font-weight:400">{{item.name}}</p>
            <p style="font-weight:100">{{item.bio}}</p>
        </div>
    </div>
</template>

<script>
import {showAvatar} from "@/api/picture"
export default {
    name:"teamCard",
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
    .main{
        width:100%;
        margin-left:0%;
        /* background-color: rgba(0, 8, 8, 0.7);
 	    border-radius: 40px;
        border: 5px; */
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
</style>
