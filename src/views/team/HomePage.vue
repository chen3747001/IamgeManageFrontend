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
                    <p >数据集数量</p>
                    <p>{{teamData.setCount}}</p>
                </div>
                <div class="column is-1by2">
                    <p>成员数量</p>
                    <p>{{teamData.peopleCount}}</p>
                </div>
            </div>

            <div class="introduction">
                <el-button type="primary" style="display:block;margin:0 auto;width:200px" @click="changeTeamInformation">修改信息</el-button>
                <p class="introductionItem">简介描述</p>
                <p class="introductionValue" v-if="user.bio==null">暂无</p>
                <p class="introductionValue" v-else>{{teamData.bio}}</p>

                <p class="introductionItem">联系邮箱</p>
                <p class="introductionValue" v-if="user.email==null">暂无</p>
                <p class="introductionValue" v-else>{{teamData.email}}</p>

                
            </div>
        </div>

        <div class="column is-9">
            <el-tabs v-model="tabName" @tab-click="selectTab">
                <el-tab-pane label="数据集" name="set" >
                    asdasdsa
                </el-tab-pane>
                <el-tab-pane label="成员" name="teamMember">
                    <div style="width:100%;height:50px;">
                        <el-button type="primary" style="width:150px;float:right" @click="toManageMemberPage">管理成员</el-button>
                    </div>
                    <div style="width:100%">
                        <div v-for="(item, index) in teamMemberData" :key="index">
                            <memberCard :item="item" style="width:100%"></memberCard>
                        </div>

                        <!--分页-->
                        <p>分页</p>
                        <Pagination
                            v-show="page.total > 1"
                            :total="page.total"
                            :page.sync="page.current"
                            :limit.sync="page.size"
                            @pagination="getTeamMember"
                        />
                        <!-- <p>asdawd</p> -->
                        <!-- <teamCard></teamCard> -->
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import {showAvatar} from "@/api/picture"
import {getTeamByTeamName} from "@/api/team"
import {getMemberByTeamName} from "@/api/teamMember"
import memberCard from "@/components/MemberCard.vue"

export default {
    name:"teamHomePage",
    components:{Pagination,memberCard},
    data(){
        return{
            teamName:this.$route.params.teamName,
            tabName:"set",
            teamData:"",
            teamMemberData:[],
            PictureSrc:require('@/assets/logo.png'),
            AvatarData:{},
            page: {
                current: 1,
                size: 3,
                total: 0,
            },
        }
    },
    created(){
        this.getTeamByTeamName()
        this.getTeamMember()
    },
    computed: {
        ...mapGetters(['token', 'user'])
    },
    methods:{
        //选择对应的标签页
        selectTab(tab, event) {
            console.log("选择的类别是："+tab.name);
            },
        
        //根据团队名获得团队信息
        getTeamByTeamName(){
            console.log("开始获得team信息")
            getTeamByTeamName(this.teamName).then((response) => {
                const { data } = response
                console.log("根据团队名"+this.teamName+"获取团队信息")
                this.teamData=data
                
                //获得信息后再加载图片
                this.loadAvatar()
            })
        },

        //根据团队名获得团队成员信息
        getTeamMember(){
            console.log("开始获得teamMember信息")
            getMemberByTeamName(this.page.current, this.page.size,this.teamName).then((response) => {
                const { data } = response
                this.page.current = data.current
                this.page.total = data.total
                this.page.size = data.size
                this.teamMemberData = data.records
                
                // console.log(this.mySet)
            })
        },

        //跳转到修改团队信息页面
        changeTeamInformation(){
            console.log("修改团队信息")
            this.$router.push({name:"teamChangeMessage",params:{teamName:this.teamName}})
        },

        //跳转到管理成员页面
        toManageMemberPage(){
            console.log("跳转到管理成员页面")
            this.$router.push({name:"teamMemberManage",params:{teamName:this.teamName}})
        },

        //显示图片数据集的封面
        loadAvatar(){
            showAvatar(this.teamData.avatar).then((res)=>{
                const{data}=res
                this.AvatarData=data

                console.log("=  =   picture name is: "+this.AvatarData.picture_name+", its detail data is:")
                console.log(data)

                this.PictureSrc='data:image/'+this.AvatarData.picture_kind+';base64,'+this.AvatarData.picture_detail
            })
        },
    }
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