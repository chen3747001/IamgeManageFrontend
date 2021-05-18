<template>
    <div>
        <p>change team message--{{teamName}}</p>
        <div  class="changeForm">
            <div class="avatar">
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
                    status-icon
                    :rules="rules"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="简介描述" prop="bio">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm.bio" ></el-input>
                    </el-form-item>

                    <el-form-item label="联系邮箱" prop="email">
                        <el-input v-model="ruleForm.email" autocomplete="off" />
                    </el-form-item>

                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('ruleForm')"
                        >提交修改</el-button>
                        <el-button @click="resetForm('ruleForm')">返回</el-button>
                    </el-form-item>
                </el-form>
                
            </div>
        </div>
    </div>
</template>

<script>
import {updateAvatar} from "@/api/picture"
import {getTeamByTeamName,updateTeamInformation} from "@/api/team"
export default {
    name:"teamChangeMessage",
    data(){
        return{
            teamData:"",
            teamName:this.$route.params.teamName,
            PictureSrc:require('@/assets/logo.png'),
            dropFile:null,
            loading: false,
            ruleForm:{
                bio:"",
                email:""
            },
            rules: {
               email: [
                { required: false, message: '请输入邮箱地址', trigger: 'blur' },
                {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: ['blur', 'change']
                }
                ]
            }
        }
    },

    created(){
        this.getTeamByTeamName()
    },
    
    methods:{
        deleteDropFile(index) {
            this.dropFile=null;
        },

        //根据团队名获得团队信息
        getTeamByTeamName(){
            console.log("开始获得team信息")
            getTeamByTeamName(this.teamName).then((response) => {
                const { data } = response
                console.log("根据团队名"+this.teamName+"获取团队信息")
                this.teamData=data
                
            })
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
            formData.append("name", this.teamData.name);
            formData.append("kind","team")
            formData.append("oldAvatar",this.teamData.avatar)

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

        //提交修改的团队的信息
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                this.loading = true
                console.log(this.ruleForm.bio+this.ruleForm.email)
                updateTeamInformation(this.teamName,this.ruleForm.bio,this.ruleForm.email)
                    .then((value) => {
                    const { code, message } = value
                    if (code === 200) {
                        this.$message({
                            message: '修改团队信息成功',
                            type: 'success'
                        })
                        setTimeout(() => {
                        this.loading = false
                        this.$router.push({name:"teamHomePage",params:{teamName:this.teamName}})
                        }, 0.1 * 1000)
                    } 
                    else {
                        this.$message.error("修改团队信息失败，"+message)
                    }
                    })
                    .catch(() => {
                    this.loading = false
                    })
                } else {
                return false
                }
            })
            },

        resetForm(formName) {
            this.$router.push({name:"teamHomePage",params:{teamName:this.teamName}})
        }
    },
}
</script>
<style scoped>
    .changeForm{
        margin-top: 50px;
        width: 60%;
        margin-left: 20%;
        padding-left: 10px;
        padding-right: 40px;
        padding-top: 40px;
        padding-bottom: 15px;
        background-color: rgba(240, 255, 255, 0.7);
 	    border-radius: 40px;
    }
</style>