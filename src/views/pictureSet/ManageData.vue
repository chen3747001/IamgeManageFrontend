<template>
    <div>
        <!-- <h1>{{SetName}}</h1> -->
        <div class="pageHeader">
            <router-link :to="{name:'UploadData',params:{SetName:SetName}}" >
                <el-button type="primary" style="float:right;width:150px">上传数据</el-button>
            </router-link>
        </div>

        <div class="pageMain">
            <div class="pageMainLeft">
                <figure class="image is-square">
                    <img :src="PictureSrc">
                </figure>
            </div>

            <div class="pageMainRight" >
                <el-table
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    border
                    ref="multipleTable"
                    height="400"
                    :key="this.renderKey"
                    @selection-change="handleSelectionChange"
                    style="width: 585px"
                    
                    >
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="图片名"
                        width="210">
                    </el-table-column>
                    <el-table-column
                        prop="size"
                        sortable
                        label="图片大小（B）"
                        width="160">
                    </el-table-column>
                    
                    <el-table-column
                        
                        width="150">
                            <template slot="header" slot-scope="scope">
                                <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                            </template>
                            <template slot-scope="scope">
                                <!-- <el-button @click="handleClick(scope.row)" size="mini">查看</el-button> -->
                                <el-button @click="loadPicture(scope.row)" size="mini">查看</el-button>
                                <el-button size="mini" type="danger" @click="deletePicture(scope.row)">删除</el-button>
                            </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                    <el-button @click="toggleSelection()">取消选择</el-button>
                    <el-button @click="deleteSelection()">批量删除</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {getPictureInformation,showPicture,deletePictureList} from "@/api/picture"
  export default {
    name: 'ManageData',
    watch: {
        item: {
            // immediate: true,
            handler (val) {
                this.loadPicture();
                this.getPicInformation();
                this.renderKey;
                this.timeStamp = new Date();
            },
            deep: true
        }
    },
    data() {
      return {
        SetName:this.$route.params.SetName,
        tableData: [{
            name: '王小虎',
            uid:"",
            size:1034
          },],
        tableDataShow:[],
        multipleSelection: [],
        search: '',
        //图片显示
        PictureData:{},
        PictureSrc:null,
        //页面重新渲染组件
        timeStamp:"",
        renderValue:0,
        renderKey: 0,
        //删除的文件列表
        deleteList:[],
        deletePictureDTO:{
          setName: "",
          pictureList:[],
          size:[],
        }
      }
    },

    created(){
        this.getPicInformation();
    },

    methods: {
        //获得对应数据集的所有的图片的信息
        getPicInformation(){
            getPictureInformation(this.SetName).then((res)=>{
                const{data}=res
                this.tableData=data
                console.log("执行了一次查找所有图片操作")
                console.log(this.tableData)
            })
        },

        //显示图片
        loadPicture(row){
            showPicture(row.uid).then((res)=>{
                const{data}=res
                this.PictureData=data

                console.log("=  =   set name is :"+this.SetName+" , picture name is: "+this.PictureData.picture_name+", its detail data is:")
                console.log(data)

                this.PictureSrc='data:image/'+this.PictureData.picture_kind+';base64,'+this.PictureData.picture_detail
            })
          },

        // handleClick(row) {
        //     console.log(row);
        //     console.log(row.name)
        // },

        //删除选中的单个图片
        deletePicture(row){
            console.log(row.name+"=="+row.uid);
            this.deletePictureDTO.setName=this.SetName
            this.deletePictureDTO.pictureList.push(row.uid)
            this.deletePictureDTO.size.push(row.size)
            console.log(this.deletePictureDTO)

            deletePictureList(this.deletePictureDTO).then((res)=>{
                const { code,value,message } = res
                if (code === 200) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  })
                } 
                else {
                  this.$message.error("删除失败，"+message)
                }
            })

            //清空需要删除的数组列表
            this.deletePictureDTO.setName=""
            this.deletePictureDTO.pictureList=new Array()
            this.deletePictureDTO.size=new Array()
            console.log("清空数组后"+this.deletePictureDTO)

            //刷新显示的数据，删除需要删除的数据
            this.tableData.splice(this.tableData.indexOf(row),1)
            console.log(this.tableData)

            this.renderKey+=1;  
        },

        toggleSelection(rows) {
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            } else {
              this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //删除批量选中的图片
        deleteSelection(){
            console.log("批量删除")
            this.deletePictureDTO.setName=this.SetName
            for(var i=0;i<this.multipleSelection.length;i++){
                console.log(this.multipleSelection[i].name)
                this.deletePictureDTO.pictureList.push(this.multipleSelection[i].uid)
                this.deletePictureDTO.size.push(this.multipleSelection[i].size)
                //显示数据中删除需要删除的图片
                this.tableData.splice(this.tableData.indexOf(this.multipleSelection[i]),1)
            }
            

            deletePictureList(this.deletePictureDTO).then((res)=>{
                const { code,value,message } = res
                if (code === 200) {
                    this.$message({
                    message: '删除成功',
                    type: 'success'
                    })
                  } 
                else {
                    this.$message.error("删除失败，"+message)
                }
              })

            //清空需要删除的数组列表
            this.deletePictureDTO.setName=""
            this.deletePictureDTO.pictureList=new Array()
            this.deletePictureDTO.size=new Array()
            console.log("清空数组后"+this.deletePictureDTO)
            
            
            
            //刷新显示的数据，删除需要删除的数据
            // this.tableData.splice(this.tableData.indexOf({name:row.name}),1)
            console.log(this.tableData)
            this.renderKey+=1;
            console.log("跟新了")
            console.log("close")
        }
        
    },
  }
</script>

<style scoped>
    .pageHeader{
      height: 50px;
      width: 100%;
    }

    .pageMain{
      width: 100%;
    }

    .pageMainLeft{
      width:450px;
      height: 450px;
      float: left;
    }

    .pageMainRight{
      float:left;
      margin-left:40px;
    }
</style>