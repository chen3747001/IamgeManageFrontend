<template>
    <div style="width:100%">
        <p>member manage--{{teamName}}</p>
        <div class="tableMain">

            <el-table
                    :data="tableData.filter(data => !search || data.memberName.toLowerCase().includes(search.toLowerCase()))"
                    border
                    ref="multipleTable"
                    height="400"
                    :key="this.renderKey"
                    style="width: 760px"
                    
                    >
                    <el-table-column
                        prop="memberName"
                        label="成员名"
                        width="130">
                    </el-table-column>
                    <el-table-column
                        prop="ableDelete"
                        label="是否有删除图片的权力"
                        width="120">
                    </el-table-column>

                    <el-table-column
                        prop="ableAdd"
                        label="是否有添加图片的权力"
                        width="120">
                    </el-table-column>

                    <el-table-column
                        prop="ableCreateSet"
                        label="是否有新建数据集的权力"
                        width="120">
                    </el-table-column>

                    <el-table-column
                        prop="ableDeleteSet"
                        label="是否有删除数据集的权力"
                        width="120">
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
                                <el-button size="mini" type="danger" @click="changeMember(scope.row)">编辑</el-button>

                                <!-- 修改信息的页面 -->
                                <el-dialog title="修改信息" :visible.sync="dialogFormVisible" width="30%" show-close>
                                    <el-form :model="updateForm">
                                        <p style="font-weight:400">团队成员：{{updateForm.memberName}}</p>
                                        <el-form-item label="是否有删除图片的权力" :label-width="formLabelWidth">
                                            <el-switch
                                                v-model="updateForm.ableDelete"
                                                active-color="#13ce66"
                                                inactive-color="#ff4949"
                                                active-value="1"
                                                inactive-value="0">
                                            </el-switch>
                                        </el-form-item>

                                        <el-form-item label="是否有添加图片的权力" :label-width="formLabelWidth">
                                            <el-switch
                                                v-model="updateForm.ableAdd"
                                                active-color="#13ce66"
                                                inactive-color="#ff4949"
                                                active-value="1"
                                                inactive-value="0">
                                            </el-switch>
                                        </el-form-item>

                                        <el-form-item label="是否有新建数据集的权力" :label-width="formLabelWidth">
                                            <el-switch
                                                v-model="updateForm.ableCreateSet"
                                                active-color="#13ce66"
                                                inactive-color="#ff4949"
                                                active-value="1"
                                                inactive-value="0">
                                            </el-switch>
                                        </el-form-item>

                                        <el-form-item label="是否有删除数据集的权力" :label-width="formLabelWidth">
                                            <el-switch
                                                v-model="updateForm.ableDeleteSet"
                                                active-color="#13ce66"
                                                inactive-color="#ff4949"
                                                active-value="1"
                                                inactive-value="0">
                                            </el-switch>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="submitChange" >确 定</el-button>
                                    </div>
                                </el-dialog>

                            </template>
                    </el-table-column>
                </el-table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getMemberByTeamNameList,updatePower} from "@/api/teamMember"
export default {
    name:"memberManage",
    data(){
        return{
            teamName:this.$route.params.teamName,
            tableData:[],
            renderKey: 0,
            search: '',

            // 修改信息页面
            updateForm:{
                teamName:this.$route.params.teamName,
                memberName:"",
                ableDelete:0,
                ableAdd:0,
                ableCreateSet:0,
                ableDeleteSet:0
            },
            formLabelWidth: '200px',
            dialogFormVisible: false,
        }
    },
    created(){
        this.getTeamMember()
    },
    watch: {
        item: {
            // immediate: true,
            handler (val) {
                this.renderKey;
            },
            deep: true
        }
    },
    computed: {
        ...mapGetters(['token', 'user'])
    },
    methods:{
        //根据团队名获得团队成员信息
        getTeamMember(){
            console.log("开始获得teamMember信息")
            getMemberByTeamNameList(this.teamName).then((response) => {
                const { data } = response
                this.tableData = data
                console.log(this.tableData[0].memberName+this.tableData[1].memberName)

                this.renderKey+=1;
                // console.log(this.mySet)
            })
        },

        //编辑成员的权力
        changeMember(row){
            console.log("编辑"+row.memberName+row.ableDelete)
            this.dialogFormVisible=true
            this.updateForm.memberName=row.memberName
            this.updateForm.ableDelete=row.ableDelete
            this.updateForm.ableAdd=row.ableAdd
            this.updateForm.ableCreateSet=row.ableCreateSet
            this.updateForm.ableDeleteSet=row.ableDeleteSet
        },

        //提交修改的用户权力
        submitChange(){
            console.log("提交修改"+this.updateForm.teamName+this.updateForm.memberName)
            console.log("ableDelete"+this.updateForm.ableDelete)
            console.log("ableAdd"+this.updateForm.ableAdd)
            console.log("ableCreateSet"+this.updateForm.ableCreateSet)
            console.log("ableDeleteSet"+this.updateForm.ableDeleteSet)
            // 最后关闭 修改框
            this.dialogFormVisible = false

            updatePower(this.updateForm).then((response)=>{
                const{code,data}=response
                if (code === 200) {
                    this.$message({
                    message: '修改权限成功',
                    type: 'success'
                    })
                    this.getTeamMember()
                  } 
                else {
                    this.$message.error("修改权限失败，"+message)
                }
            })
        }
    }
}
</script>
<style scoped>
    .tableMain{
        width:70%;
        margin-left: 15%;
        margin-top: 50px;
    }
</style>