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
                    <p>{{this.setPage.total}}</p>
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
            <el-tabs v-model="tabKindName" @tab-click="selectTab">
                <!-- 显示数据集数据 -->
                <el-tab-pane label="数据集" name="set" >
                    <div class="cards-header">
                        <div class="searchInput">
                        <div style="float:left;width:250px;">
                            <p class="control has-icons-left" >
                            <input class="input is-link" type="text" v-model="searchName" placeholder="输入数据集名称">
                            <span class="icon is-left">
                                <i class="el-icon-s-check"></i>
                            </span>
                            </p>
                        </div>
                        <div style="float:left;width:100px;">
                            <p class="control" >
                            <b-button
                                type="is-link"
                                @click="search()"
                            >搜索
                            </b-button>
                            </p>
                        </div>
                        </div>

                        <b-button
                            type="is-link"
                            style="float:right"
                            @click="createSet"
                        >
                        创建新的数据集
                        </b-button>
                    </div>

                    <!-- 展示我的set -->
                    <div class="cards-main">
                        <el-tabs v-model="tabName" @tab-click="selectSetTab">
                            <el-tab-pane label="热度" name="hot">
                                <div v-for="(item, index) in mySet" :key="index">
                                    <card :item="item"></card>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="时间" name="time">
                                <div v-for="(item, index) in mySet" :key="index">
                                    <card :item="item"></card>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    
                
                    <!--分页-->
                    <!-- <p>分页</p> -->
                    <pagination
                        v-show="setPage.total > 0"
                        :total="setPage.total"
                        :page.sync="setPage.current"
                        :limit.sync="setPage.size"
                        @pagination="init"
                    />
                    </div>
                

                </el-tab-pane>
                
                <el-tab-pane label="成员" name="teamMember">
                    <div style="width:100%;height:50px;">
                        <el-button type="primary" style="width:150px;float:left" @click="addMember">添加成员</el-button>
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
import Card from "@/components/Card.vue"
import {showMyPictureSet,showMyPictureSetTest} from "@/api/pictureSet"
import {inviteJoin} from "@/api/action"

export default {
    name:"teamHomePage",
    components:{Pagination,memberCard,Card},
    data(){
        return{
            teamName:this.$route.params.teamName,
            tabKindName:"set",
            teamData:"",
            teamMemberData:[],
            PictureSrc:require('@/assets/logo.png'),
            AvatarData:{},
            page: {
                current: 1,
                size: 3,
                total: 0,
            },

            mySet:{},
            testurl:"",
            tabName: 'hot',
            setPage: {
                current: 1,
                size: 3,
                total: 0,
                tab: 'hot'
            },

            // 数据集显示的选择条件
            scenario:"",
            dataKind:"",
            searchName:"",
        }
    },
    created(){
        this.getTeamByTeamName()
        this.getTeamMember()
        this.init()
    },
    computed: {
        ...mapGetters(['token', 'user'])
    },
    methods:{
        //选择对应的标签页
        selectTab(tab, event) {
            console.log("选择的类别是："+tab.name);
            },
        //选择对应的标签页
        selectSetTab(tab, event) {
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

        //跳转到新建数据集页面
        createSet(){
            console.log("修改团队信息")
            this.$router.push({name:"createPictureSet",params:{ownerName:this.teamName}})
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

        //显示数据集
        init() {
            showMyPictureSetTest(this.teamName,this.setPage.current, this.setPage.size,this.setPage.tab,this.scenario,this.dataKind,this.searchName).then((response) => {
                const { data } = response
                this.setPage.current = data.current
                this.setPage.total = data.total
                this.setPage.size = data.size
                this.mySet = data.records

                console.log("显示团队的数据集信息")
                console.log(this.mySet)
                // console.log(this.mySet)
            })
        },

        //根据输入的关键词筛选显示数据集
        search(){
            console.log("执行搜索"+this.scenario+"=="+this.dataKind+"=="+this.searchName)
            this.init()
        },

        //添加成员
        addMember(){
            this.$prompt('请输入用户名', '添加用户', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                    inviteJoin(this.user.username,value,this.teamName).then((res)=>{
                        const{code,message}=res
                        if(code===200){
                            this.$message({
                                type: 'success',
                                message: '邀请成功: ' + value
                            });
                        }
                        else{
                            this.$message({
                                type: 'error',
                                message: '邀请失败，原因是： ' + message
                            });
                        }
                    })
                    
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
                });
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

    .cards-header{
      width: 100%;
      height: 40px;
    }

    .cards-main{
        width: 100%;
    }
</style>