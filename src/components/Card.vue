<template>
    <!-- 设置跳转的路径 -->
    <router-link :to="{name:'PictureSetDetail',params:{SetName:item.name}}" >
        <div class="card" >
            <div class="card-image">
                <figure class="image  is-4by3">
                    <img :src="AvatarSrc">
                </figure>
            </div>

            <div class="card-content">

                <div class="content">
                    <p class="title is-4">{{item.name}}</p>
                    <p>test</p>
                    <p>one | two</p>
                </div>

                <div class="media">
                    <div class="media-left">
                        <figure class="image is-32x32">
                            <img src="@/assets/logo.png" alt="Placeholder image">
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
export default {
  name: "Card",
  props:{
      item:Object
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

  data() {
    return{
        AvatarData:{},
        AvatarSrc:null,
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
        box-shadow: 10px 10px 20px 10px rgba(3, 3, 3, 0.5); 
            /* 盒子向上移动效果，改变上外边距 */
        
    }
</style> 