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
                <!-- 设置跳转的路径 -->
                <router-link :to="{name:'ManageData',params:{SetName:SetName}}" >
                    <el-button type="primary" style="float:right;width:150px">管理数据</el-button>
                </router-link>
                
            </div>
        </div>

        <div class="pageBody">
                
            <el-tabs v-model="tabName" @tab-click="selectTab">
            <el-tab-pane label="概要" name="outline">
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
    export default {
        name: 'PictureSetDetail',
        data(){
            return{
                url: require('@/assets/logo.png'),
                SetName:this.$route.params.SetName,
                tabName: 'hot',
            }
        },
        methods:{
            selectTab(tab, event) {

                console.log("选择的类别是："+tab.name);
            },
            
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
        width: 80%;
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
</style> 