<template>
    <div class="columns">
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

                <!-- <figure class="image is-square">
                    <img :src="PictureSrc">
                </figure> -->
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

                    <el-form-item label="个人邮箱" prop="email">
                        <el-input v-model="ruleForm.email" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="个人手机号" prop="mobile">
                        <el-input v-model="ruleForm.mobile" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="职业" prop="role">
                        <el-input v-model="ruleForm.role" autocomplete="off" />
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
import { mapGetters } from 'vuex'
import {updateAvatar} from "@/api/picture"
import {updateUserInformation} from '@/api/auth/auth'
export default {
    name:"changeMessage",
    data(){
        return{
            // PictureSrc:null,
            PictureSrc:require('@/assets/logo.png'),
            dropFile:null,
            loading: false,
            ruleForm:{
                bio:"",
                email:"",
                mobile:"",
                role:"",
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
    computed: {
    ...mapGetters(['token', 'user'])
    },
    methods:{
        changeUserInformation(){
            console.log("开始修改")
            this.$router.push({name:"ChangeMessage"})
        },

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
            formData.append("name", this.user.username);
            formData.append("kind","user")
            formData.append("oldAvatar",this.user.avatar)

            updateAvatar(formData).then((response)=>{
                const{code,message} =response
                this.message=message;
                console.log(message)
                this.$message({
                  message: '上传图片成功',
                  type: 'success'
                })
            })
        },

        //提交用户修改的信息
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                this.loading = true
                console.log(this.ruleForm.bio+this.ruleForm.email+this.ruleForm.mobile+this.ruleForm.role)
                updateUserInformation(this.ruleForm)
                    .then((value) => {
                    const { code, message } = value
                    if (code === 200) {
                        this.$message({
                        message: '新建团队',
                        type: 'success'
                        })
                        setTimeout(() => {
                        this.loading = false
                        this.$router.push({name:"UserHomePage"})
                        }, 0.1 * 1000)
                    } 
                    else {
                        this.$message.error("修改用户信息失败，"+message)
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
            this.$router.push({name:"UserHomePage"})
        }
    }
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
