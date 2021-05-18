<template>
    <!-- 设置跳转的路径 -->
    <router-link :to="{name:'PictureSetDetail',params:{SetName:item.name}}" >
        <div class="card" >
            <div class="card-image">
                <figure class="image  is-3by3" >
                    <img :src="AvatarSrc" class="avatarPic">
                </figure>
            </div>

            <div class="card-content">

                <div class="content">
                    <p class="title is-4">{{item.name}}</p>
                    <p>{{item.scenario}}</p>
                    <p>{{item.dataKind}}</p>
                </div>

                <div class="media">
                    <div class="media-left">
                        <figure class="image is-32x32">
                            <img  :src="ownerAvatarSrc">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">{{item.owner}}</p>
                    </div>
                </div>
            </div>
            </div>
        </router-link>
</template>

<script>
import {showAvatar} from "@/api/picture"
import {getUserInformation} from "@/api/auth/auth"
export default {
  name: "Card",
  props:{
      item:Object
  },
  watch: {
    item: {
        immediate: true,
        handler (val) {
            this.loadAvatar()
        },
        deep: true
    }
    },

  data() {
    return{
        AvatarData:{},
        AvatarSrc:null,
        ownerAvatarData:{},
        ownerAvatarSrc:null,
        ownerData:"",
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
            this.getOwnerInformation()
        })
      },

    //获得拥有者的信息
    getOwnerInformation(){
        getUserInformation(this.item.owner).then((res)=>{
            const{code,data,message}=res
            this.ownerData=data

            console.log("owner name is : "+this.ownerData.username+" its avatar is : "+this.ownerData.avatar)
            console.log(this.ownerData)
            this.loadOwnerAvatar()
        })
    },

    //显示图片数据集拥有者的头像
    loadOwnerAvatar(){
        showAvatar(this.ownerData.avatar).then((res)=>{
            const{data}=res
            this.ownerAvatarData=data

            console.log("=  =   owner name is :"+this.item.name+" , picture name is: "+this.ownerAvatarData.picture_name+", its detail data is:")
            console.log(data)

            this.ownerAvatarSrc='data:image/'+this.ownerAvatarData.picture_kind+';base64,'+this.ownerAvatarData.picture_detail
        })
      },
    
  

  }
  
}
</script>

<style scoped>
    .card{
        width:29%;
        margin-left: 2%;
        margin-right: 2%;
        margin-top:3%;
        margin-bottom:3% ;
        float: left;
        max-height: 30%;
    }

    .card-content{
        padding-top:1px;
        padding-bottom: 1px;
    }

    .card:hover{
        box-shadow: 5px 5px 5px 20px rgba(175, 174, 240, 0.2); 
            /* 盒子向上移动效果，改变上外边距 */
        
    }

    /* 添加了移动到该card后，图片放大效果 */
    .card:hover .avatarPic{
        transition: .5s transform;
        transform: scale(1.25);
    }

    .avatarPic{
        width:233px;
        height:233px;
    }
</style> 