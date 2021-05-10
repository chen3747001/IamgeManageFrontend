<template>
    <div class="pageMain">
        <div class="pageHeader">
            <div class="headerMain">
                <div class="avatar">
                    <el-avatar shape="square" :size="80" :src="url"></el-avatar>
                </div>

                <div>
                    <div class="headIntroduction">
                        <h1 style="float:left;font-weight:bold;font-size:26px;margin-left:20px">{{SetName}}</h1>
                        <el-tag style="float:left;margin-left: 10px;margin-top:5px">私有</el-tag>
                        <el-tag type="success" style="float:left;margin-left: 10px;;margin-top:5px">拥有者</el-tag>
                        
                    </div>
                    <div style="margin-left:30px">
                        <h1 style="font-size:15px;margin-left:70px">创建来自 eafaefaef</h1>
                    </div>
                </div>
            </div>
            <div style="float:right;margin-top:20px;width:200px">
                <el-dropdown style="float:right;width:150px" @command="handleCommand">
                    <el-button type="primary">
                        更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="manage">管理数据</el-dropdown-item>
                        <el-dropdown-item command="download">下载数据</el-dropdown-item>
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
                        <ul>
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
            <el-tab-pane label="活动" name="action">
            </el-tab-pane>
            <el-tab-pane label="设置" name="setting">
            </el-tab-pane>
         </el-tabs>
        </div>
    </div>
</template>

<script>
    import {getPictureInformation,showPicture} from "@/api/picture"
    import {getSetInformationByName,downloadSet} from "@/api/pictureSet"
    import axios from 'axios'
    
    export default {
        name: 'PictureSetDetail',
        data(){
            return{
                url: require('@/assets/logo.png'),
                SetName:this.$route.params.SetName,
                tabName: 'hot',
                tableData:[{name:'chen'},{name:'yu'},{name:'heng'}],
                //图片显示
                PictureData:{},
                PictureSrc:null,
                
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
                pictureSizeLevel:"KB",
                pictureSize:0.0,
                search: '',

            }
        },
        created(){
            this.getInformationByName();
            this.getPicInformation();
        },
        methods:{
            //选择对应的标签页
            selectTab(tab, event) {

                console.log("选择的类别是："+tab.name);
            },

            //获得该图片数据集的信息
            getInformationByName(){
                getSetInformationByName(this.SetName).then((res)=>{
                    const{ data }=res
                    // this.PictureSet=data
                    console.log(this.SetName+" 的数据集信息是：")
                    this.pictureSet=data
                    this.calculatePictureSizeLevel()
                    console.log("this.pictureSet is: "+this.pictureSet.name+this.pictureSet.owner)
                })
                
                
                console.log(this.getData)
                // console.log(this.PictureSet.name+" == "+this.PictureSet.owner)
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

            //下拉菜单的操作
            handleCommand(command) {
                // this.$message('click on item ' + command);
                if(command=="manage"){
                    this.$router.push({name:'ManageData',params:{SetName:this.SetName}})
                }
                else if(command=="download"){
                    this.downLoadSet()
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
</style> 