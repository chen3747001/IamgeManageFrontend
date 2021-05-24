<template>
    <div class="pageMain">
        <div class="pageHeader">
            <div class="headerMain">
                <div class="avatar">
                    <el-avatar shape="square" :size="80" :src="AvatarSrc"></el-avatar>
                </div>

                <div>
                    <div class="headIntroduction">
                        <h1 style="float:left;font-weight:bold;font-size:26px;margin-left:20px">{{SetName}}</h1>
                        <el-tag style="float:left;margin-left: 10px;margin-top:5px">{{pictureSet.useRange}}</el-tag>

                        <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">{{introductionRight}}</div>
                            <el-button size="small" type="success" style="float:left;margin-left: 10px;;margin-top:5px">{{userRight.role}}</el-button>
                        </el-tooltip>
                        
                    </div>
                    <div style="margin-left:30px">
                        <h1 style="font-size:15px;margin-left:70px">简介：{{pictureSet.bio}}</h1>
                    </div>
                </div>
            </div>
            <div style="float:right;margin-top:20px;width:200px" :key="this.renderCollectKey" v-if="token != null">
                <!-- 显示收藏按钮 -->
                <div style="float:left;width:40px;margin-bottom:10px" >
                    <div v-if="isCollect==false">
                        <el-tooltip class="item" effect="dark" content="点击收藏该数据集" placement="top">
                            <el-button type="danger" icon="el-icon-star-off" circle @click="collectSet"></el-button>
                        </el-tooltip>
                        
                    </div>
                    <div v-else-if="isCollect==true">
                        <el-tooltip class="item" effect="dark" content="点击取消收藏该数据集" placement="top">
                            <el-button type="success" icon="el-icon-star-off" circle @click="removeCollectSet"></el-button>
                        </el-tooltip>
                    </div>
                </div>

                <el-dropdown style="float:right;width:150px" @command="handleCommand">
                    <el-button type="primary">
                        更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="manage" v-if="showManageDataButton==true">管理数据</el-dropdown-item>
                        <el-dropdown-item command="download">下载数据</el-dropdown-item>
                        <el-dropdown-item command="delete" v-if="userRight.ableDeleteSet==1">删除数据集</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- 设置跳转的路径 -->
                <!-- <router-link :to="{name:'ManageData',params:{SetName:SetName}}" >
                    <el-button type="primary" style="float:right;width:150px">管理数据</el-button>
                </router-link>
                    <el-button type="primary" style="float:right;width:150px" @click="downLoadSet">下载数据</el-button> -->
                
            </div>
        </div>

        <div class="pageBody">
                
            <el-tabs v-model="tabName" @tab-click="selectTab">
            <el-tab-pane label="概要" name="outline" >
                <div class="columns">
                    <!-- 展示图片列表 -->
                    <div class="column is-3">
                        <el-table
                            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                            border
                            height="400"
                            @cell-click="changePicture"
                            >
                            <el-table-column
                                prop="name"
                                label="图片名"
                                width="250">
                                <template slot="header" slot-scope="scope">
                                    <el-input
                                        v-model="search"
                                        size="mini"
                                        placeholder="输入关键字搜索"/>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <!-- 展示图片 -->
                    <div class="column is-6">
                        <figure class="image is-square">
                            <img :src="PictureSrc">
                        </figure>
                    </div>

                    <!-- 展示数据集的基本信息 -->
                    <div class="column is-3">
                        <ul :key="this.browseKey">
                            <li>拥有者：<br><span>{{pictureSet.owner}}</span></li>
                            <li>创建时间：<br><span> {{dayjs(pictureSet.createTime).format('YYYY/MM/DD HH:mm:ss')}}</span></li>
                            <li>最近一次修改时间：<br><span>{{dayjs(pictureSet.amendTime).format('YYYY/MM/DD HH:mm:ss')}}</span></li>
                            <li>图片数量：<br><span> {{pictureSet.amountPicture}}</span></li>
                            <!-- 根据总大小，分KB.MB,G三个级别 -->
                            <li v-if="pictureSizeLevel=='KB'"> 图片总大小：
                                <br><span>{{ pictureSize }}KB</span></li>
                            <li v-else-if="pictureSizeLevel=='MB'">图片总大小：
                                <br><span>{{ pictureSize }}MB</span></li>
                            <li v-else>图片总大小：
                                <br><span>{{ pictureSize }}GB</span></li>

                            <li>公开/私有：<br><span> {{pictureSet.useRange}}</span></li>
                            <li>访问量：<br><span> {{pictureSet.browse}}</span></li>
                        </ul> 
                    </div>
                </div>
            </el-tab-pane>

            <!-- 只有拥有权限才可以进行如下操作 -->
            <el-tab-pane label="活动" name="action">
            </el-tab-pane>
            <!-- 这是修改信息页面 -->
            <el-tab-pane label="设置" name="setting" >
                <div v-if="userRight.ableChange==0">
                    <h1>没有权限进行操作</h1>
                </div>


                <div v-else-if="userRight.ableChange==1">
                    <div class="changeavatar" >
                        <b-upload v-model="dropFile" drag-drop expanded>
                            <section class="section">
                                <div class="content has-text-centered">
                                    <p>修改头像，将文件拖拽至此处或者点击上传</p>
                                </div>
                            </section>
                        </b-upload>

                        <div class="tags">
                            <span class="tag is-primary" v-if="dropFile!=null">
                                {{dropFile.name}}
                                <button class="delete is-small" type="button" @click="deleteDropFile()"></button>
                            </span>
                        </div>
                        <el-button type="primary" style="float:center;width:150px;margin-left:230px;margin-bottom:20px;"  @click="submit($event)">提交</el-button>
                    </div>

                    <div class="introduction">
                        <el-form
                            ref="ruleForm"
                            v-loading="loading"
                            :model="ruleForm"
                            :key="this.renderKey"
                            status-icon
                            label-width="100px"
                            class="demo-ruleForm"
                        >
                            <el-form-item label="简介描述" prop="bio">
                                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="ruleForm.bio"></el-input>
                            </el-form-item>

                            <el-form-item label="应用场景">
                                <el-radio-group v-model="ruleForm.scenario">
                                    <el-radio label="family" value="family">家用</el-radio>
                                    <el-radio label="science" value="science">科研用</el-radio>
                                    <el-radio label="mixed" value="mixed">混合的</el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="图片类型">
                                <el-select v-model="ruleForm.dataKind" placeholder="图片类型">
                                    <el-option label="游戏" value="game"></el-option>
                                    <el-option label="人物" value="people"></el-option>
                                    <el-option label="景色" value="scene"></el-option>
                                    <el-option label="照片" value="photograph"></el-option>
                                    <el-option label="卡通" value="cartoon"></el-option>
                                    <el-option label="混合的" value="mixed"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="submitForm('ruleForm')"
                                >提交修改</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
         </el-tabs>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import {getPictureInformation,showPicture} from "@/api/picture"
    import {getRightSet} from "@/api/right"
    import {getSetInformationByName,downloadSet,updateSetInformation,addBrowseCount} from "@/api/pictureSet"
    import {updateAvatar,showAvatar} from "@/api/picture"
    import {isExisted,createCollect,deleteCollect} from "@/api/collect"

    import axios from 'axios'
    
    export default {
        name: 'PictureSetDetail',
        data(){
            return{
                url: require('@/assets/logo.png'),
                SetName:this.$route.params.SetName,
                tabName: 'outline',
                tableData:[{name:'chen'},{name:'yu'},{name:'heng'}],
                //图片显示
                PictureData:{},
                PictureSrc:null,
                //头像显示
                AvatarData:{},
                AvatarSrc:null,
                
                //该图片数据集的信息
                pictureSet:{
                    // id:"",
                    // name:"",
                    // owner:"",
                    // createTime:"",
                    // amendTime:"",
                    // amountPicture:0,
                    // size:0,
                    // avatar:"",
                    // useRange:"",
                    // browse:""
                },
                //修改数据集信息
                ruleForm:{
                    bio:"",
                    scenario:"",
                    dataKind:"",
            }   ,
                loading: false,

                //刷新数据用
                renderKey: 0,
                pictureSizeLevel:"KB",
                pictureSize:0.0,
                search: '',

                //修改头像
                dropFile:null,

                //收藏相关
                isCollect:false,
                renderCollectKey:0,

                //用户权限相关
                viewerName:"0",
                introductionRight:"",

                userRight:{
                    ownerKind:"",
                    role:"参观者",
                    ableAdd:0,
                    ableDelete:0,
                    ableCreateSet:0,
                    ableDeleteSet:0,
                    ableChange:0,
                },
                //是否展示管理数据的按钮
                showManageDataButton:false,
                //刷新浏览量的key
                browseKey:0,

            }
        },
        created(){
            this.getInformationByName();
            this.getPicInformation();
            if(this.token!=null){
                this.isAlreadyCollect();
            }
            
        },
        computed: {
            ...mapGetters(['token', 'user'])
        },
        watch: {
        item: {
            // immediate: true,
            handler (val) {
                this.renderKey;
                this.renderCollectKey;
                this.browseKey;
            },
            deep: true
        }
        },
        methods:{
            //选择对应的标签页
            selectTab(tab, event) {

                console.log("选择的类别是："+tab.name);
            },

            //查出该数据集是否被该用户收藏
            isAlreadyCollect(){
                isExisted(this.user.username,this.SetName).then((res)=>{
                    const{data}=res
                    if(data=="存在"){
                        this.isCollect=true
                    }
                    console.log("iscollect is:"+this.isCollect)
                })
            },

            //获得该图片数据集的信息
            getInformationByName(){
                getSetInformationByName(this.SetName).then((res)=>{
                    const{ data }=res
                    // this.PictureSet=data
                    console.log(this.SetName+" 的数据集信息是：")
                    this.pictureSet=data
                    this.calculatePictureSizeLevel()
                    console.log("this.pictureSet is: "+this.pictureSet.name+this.pictureSet.owner+this.pictureSet.ownerAvatar)

                    //获得用户在该数据集内的权限
                    if(this.user.username!=null){
                        this.getUserRight()
                    }
                    //用户未登录
                    else{
                        //添加一条浏览记录
                        this.addBrowse()
                        this.introductionRight="由于未登录，你没有任何权限"
                    }
                    

                    //初始提交的信息
                    this.ruleForm.bio=this.pictureSet.bio
                    this.ruleForm.scenario=this.pictureSet.scenario
                    this.ruleForm.dataKind=this.pictureSize.dataKind

                    //更新数据集头像的显示
                    this.loadAvatar()

                    //修改监听的数据
                    this.renderKey+=1;
                })
                
                
                console.log(this.getData)
                // console.log(this.PictureSet.name+" == "+this.PictureSet.owner)
            },

            //获得该用户在该数据集内的权限
            getUserRight(){
                getRightSet(this.pictureSet.name,this.pictureSet.owner)
                .then((res)=>{
                    const{data}=res
                    this.userRight=data

                    // this.$set(this.userRight, 'ableChange',data.ableChange)
                    if(this.userRight.ableAdd==1 || this.userRight.ableDelete==1){
                        this.showManageDataButton=true
                    }
                    this.introductionRight="你的权限是： 添加数据："+this.userRight.ableAdd+" |删除数据： "+this.userRight.ableDelete
                        +" |删除数据集： "+this.userRight.ableDeleteSet+" |编辑设置： "+this.userRight.ableChange
                    //判断该用户是不是该数据集的拥有者，不是就添加一个浏览量
                    if(this.userRight.role=="参观者"){
                        this.addBrowse()
                    }
                    console.log("用户的权限是："+this.showManageDataButton)
                    console.log(this.userRight)
                })
            },

            //添加一点浏览量（如果该用户不是该数据集的拥有者）
            addBrowse(){
                addBrowseCount(this.SetName).then((res)=>{
                    console.log(this.SetName+"的浏览量增加了")
                    //刷新浏览量的显示
                    this.pictureSet.browse+=1
                    this.browseKey+=1
                })
            },

            //更换显示的图片
            changePicture(row){
                console.log(row.name+" == "+row.uid)
                showPicture(row.uid).then((res)=>{
                    const{data}=res
                    this.PictureData=data

                    console.log("=  =   set name is :"+this.SetName+" , picture name is: "+this.PictureData.picture_name+", its detail data is:")
                    console.log(data)

                    this.PictureSrc='data:image/'+this.PictureData.picture_kind+';base64,'+this.PictureData.picture_detail
                })
            },

            //获得对应数据集的所有的图片的信息
            getPicInformation(){
                getPictureInformation(this.SetName).then((res)=>{
                    const{data}=res
                    this.tableData=data
                    console.log("执行了一次查找所有图片操作")
                    console.log(this.tableData)
                })
            },

            //显示图片数据集的封面
            loadAvatar(){
                showAvatar(this.pictureSet.avatar).then((res)=>{
                    const{data}=res
                    this.AvatarData=data

                    console.log("=  =   set name is :"+this.pictureSet.name+" , picture name is: "+this.AvatarData.picture_name+", its detail data is:")
                    console.log(data)

                    this.AvatarSrc='data:image/'+this.AvatarData.picture_kind+';base64,'+this.AvatarData.picture_detail
                })
            },

            //下拉菜单的操作
            handleCommand(command) {
                // this.$message('click on item ' + command);
                if(command=="manage"){
                    this.$router.push({name:'ManageData',params:{SetName:this.SetName}})
                }
                else if(command=="download"){
                    this.downLoadSet()
                }
                else if(command=="delete"){
                    console.log("想要删除数据集")
                }
            },

            //下载该数据集的内容
            downLoadSet(){
                console.log("开始下载")

                axios({
                    method:"post",
                    responseType:'blob',
                    url:'http://127.0.0.1:8000/pictureSet/downloadSet/',
                    withCredentials:false,
                    timeout: 5 * 1000,
                    params:{
                        setName:this.SetName
                    }
                }).then((res)=>{
                    let blob = new Blob([res.data], {type: "application/zip"});  
                    let objectUrl = URL.createObjectURL(blob);
                    window.location.href = objectUrl;
                })
            },

            //计算图片的大小，分KB,MB,GB显示
            calculatePictureSizeLevel(){
                var size=this.pictureSet.size
                //KB
                if(size<(1024*1024)){
                    this.pictureSize=parseFloat(size/1024).toFixed(2);
                    this.pictureSizeLevel="KB"
                }
                //MB
                else if(size<(1024*1024*1024)){
                    this.pictureSize=parseFloat(size/(1024*1024)).toFixed(2);
                    this.pictureSizeLevel="MB"
                }
                //GB
                else{
                    this.pictureSize=parseFloat(size/(1024*1024*1024)).toFixed(2);
                    this.pictureSizeLevel="GB"
                }
            },

            //删除选中的头像图片
            deleteDropFile(index) {
                this.dropFile=null;
            },

            //提交修改的头像信息
            submit: function (event) {
                //阻止元素发生默认的行为
                console.log("这是上交数据环节");
                console.log(this.dropFile)
                console.log("此时form内的数据")
                // 向formdata中添加需要传输的数据
                let formData = new FormData();
                formData.append("files",this.dropFile)
                formData.append("name", this.pictureSet.name);
                formData.append("kind","set")
                formData.append("oldAvatar",this.pictureSet.avatar)

                updateAvatar(formData).then((response)=>{
                    const{code,message} =response
                    this.message=message;
                    console.log(message)
                    this.$message({
                    message: '修改头像成功',
                    type: 'success'
                    })
                })
            },

            //提交修改的数据集的信息
            submitForm(formName) {
                this.loading = true
                console.log("修改数据集信息"+this.ruleForm.bio+this.ruleForm.scenario+this.ruleForm.dataKind)
                updateSetInformation(this.SetName,this.ruleForm.bio,this.ruleForm.scenario,this.ruleForm.dataKind)
                    .then((value) => {
                    const { code, message } = value
                    this.loading = false

                    //修改监听的数据
                    this.renderKey+=1;


                    if (code === 200) {
                        this.$message({
                            message: '修改数据集信息成功',
                            type: 'success'
                        })
                    } 
                    else {
                        this.$message.error("修改团队信息失败，"+message)
                    }
                    })
                    
            },

            //点击收藏数据集
            collectSet(){
                createCollect(this.user.username,this.SetName)
                .then((res)=>{
                    // 修改是否收藏的数据，刷新key来刷新收藏按钮的显示
                    this.isCollect=true
                    this.renderCollectKey+=1
                })
            },

            //取消收藏数据集
            removeCollectSet(){
                deleteCollect(this.user.username,this.SetName)
                .then((res)=>{
                    // 修改是否收藏的数据，刷新key来刷新收藏按钮的显示
                    this.isCollect=false
                    this.renderCollectKey+=1
                })
            }
            
        }
    
    }
</script>
    
<style scoped>
    .pageMain{
        width: 100%;
        min-height: 400px;
    }
    .pageHeader{
        width: 100%;
        height: 100px;
        float: center;
        min-width: 800px;
    }

    .pageBody{
        width: 100%;
        float: center;
        min-width: 600px;
    }

    .headerMain{
        height: 100px;
        width:400px;
        float: left;
    }

    .avatar{
        float: left;
    }

    .headIntroduction{
        margin-top: 0px;
        margin-bottom: 15px;
        margin-left: 30px;
        width:500px;
        height: 40px;
    }

    ul li{
        list-style: none;
        font-size: 18px;
        font-weight: 600;
    }

    ul li span{
        margin-left: 20px;
        font-size: 16px;
        font-weight: 400;
    }

    .introduction{
        width: 60%;
    }

    .changeavatar{
        width: 60%;
    }
</style> 