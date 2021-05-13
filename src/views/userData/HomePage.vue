<template>
    <div class="columns">
        <div  class="column is-3">
            <div class="avatar">
                <el-avatar class="avatarPic" shape="square" :size="160" :src="PictureSrc">
                </el-avatar>
                <!-- <figure class="image is-square">
                    <img :src="PictureSrc">
                </figure> -->
            </div>

            <div  class="columns" style="text-align:center"> 
                <div class="column is-1by2">
                    <p >收藏数</p>
                    <p>12</p>
                </div>
                <div class="column is-1by2">
                    <p>团队</p>
                    <p>{{teamNumber}}</p>
                </div>
            </div>

            <div class="introduction">
                <el-button type="primary" style="display:block;margin:0 auto;width:200px" @click="changeUserInformation">修改信息</el-button>
                <p class="introductionItem">简介描述</p>
                <p class="introductionValue" v-if="user.bio==null">暂无</p>
                <p class="introductionValue" v-else>{{user.bio}}</p>

                <p class="introductionItem">个人邮箱</p>
                <p class="introductionValue" v-if="user.email==null">暂无</p>
                <p class="introductionValue" v-else>{{user.email}}</p>

                <p class="introductionItem">个人手机号</p>
                <p class="introductionValue" v-if="user.mobile==null">暂无</p>
                <p class="introductionValue" v-else>{{user.mobile}}</p>

                <p class="introductionItem">职业</p>
                <p class="introductionValue" v-if="user.role==null">暂无</p>
                <p class="introductionValue" v-else>{{user.role}}</p>
                
            </div>
        </div>

        <div class="column is-9">
            <el-tabs v-model="tabName" @tab-click="selectTab">
                <el-tab-pane label="团队" name="team">
                    <div style="width:100%;height:50px;">
                        <el-button type="primary" style="width:150px;float:right" @click="toCreateTeamPage">新建团队</el-button>
                    </div>
                    <div style="width:100%">
                        <div v-for="(item, index) in teamData" :key="index">
                            <!-- 设置点击team card的跳转路由 -->
                            <router-link :to="{name:'teamHomePage',params:{teamName:item.name}}" >
                                <teamCard :item="item" style="width:100%"></teamCard>
                            </router-link>
                        </div>

                        <p>分页</p>
                        <!--分页-->
                        <Pagination
                            v-show="page.total > 1"
                            :total="page.total"
                            :page.sync="page.current"
                            :limit.sync="page.size"
                            @pagination="getTeamByMemberName"
                        />
                        <!-- <p>asdawd</p> -->
                        <!-- <teamCard></teamCard> -->
                    </div>
                </el-tab-pane>
                <el-tab-pane label="收藏" name="collect" >
                    asdasdsa
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {showAvatar} from "@/api/picture"
import {getTeamByMemberName,getTeamByMemberNamePage} from "@/api/team"
import teamCard from "@/components/TeamCard.vue"
import Pagination from '@/components/Pagination'
export default {
    name:"useHomePage",
    components:{teamCard,Pagination},
    data(){
        return{
            // PictureSrc:null,
            PictureSrc:require('@/assets/logo.png'),
            AvatarData:{},
            tabName:"team",
            teamData:[],
            page: {
                current: 1,
                size: 3,
                total: 0,
            },
            teamNumber:0,
        }
    },
    created(){
        this.loadAvatar()
        this.getTeamByMemberName()
        
    },

    computed: {
    ...mapGetters(['token', 'user'])
    },
    methods:{
        changeUserInformation(){
            console.log("开始修改")
            this.$router.push({name:"ChangeMessage"})
        },

        //显示图片数据集的封面
        loadAvatar(){
            showAvatar(this.user.avatar).then((res)=>{
                const{data}=res
                this.AvatarData=data

                console.log("=  =   picture name is: "+this.AvatarData.picture_name+", its detail data is:")
                console.log(data)

                this.PictureSrc='data:image/'+this.AvatarData.picture_kind+';base64,'+this.AvatarData.picture_detail
            })
        },

        //选择对应的标签页
        selectTab(tab, event) {
            console.log("选择的类别是："+tab.name);
            },

        //跳转到新建团队页面
        toCreateTeamPage(){
            this.$router.push({name:"createTeam"})
        },

        //根据用户名获得团队信息
        getTeamByMemberName(){
            console.log("开始获得team信息")
            getTeamByMemberNamePage(this.page.current, this.page.size).then((response) => {
                const { data } = response
                this.page.current = data.current
                this.page.total = data.total
                this.page.size = data.size
                this.teamData = data.records

                this.teamNumber=data.total
                
                // console.log(this.mySet)
            })
        },
        },
        
}
</script>

<style scoped>
    .avatar{
        width: 100%;
        height: 300px;
        
        background-color: rgba(240, 255, 255, 0.5);
 	    border-radius: 40px;

    }

    .introdutionMiddle{
        width: 100%;
        height: 100px;
    }

    .introduction{
        width: 100%;
    }

    .introductionItem{
        margin-top: 20px;
        font-size: 18;
        font-weight: 600;
    }

    .introductionValue{
        margin-top: 10px;
        margin-left: 5px;
        font-size: 16;
        font-weight: 300;
    }

    .avatarPic{
        margin-top: 70px;
        margin-left: 50px;
    }
</style>
