<template>
    <div>
        <!-- <p>create team-{{this.user}}</p> -->
        <div class="createForm">
          <el-form
            ref="ruleForm"
            v-loading="loading"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="团队名称" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>

            <el-form-item label="团队简介" prop="bio">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm.bio" ></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
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
</template>
<script>
import { mapGetters } from 'vuex'
import {createTeam} from "@/api/team"
export default {
    name:"createTeam",
    data(){
        return{
            loading: false,
            ruleForm: {
                name: '',
                owner: "",
                bio: '',
                email: '',
                avatar:"add.png",
                peopleCount:1,
                setCount:0,
            },
            rules: {
                email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
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
        //提交用户修改的信息
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                this.loading = true
                this.ruleForm.owner=this.user.username
                console.log(this.ruleForm.name+this.ruleForm.owner+this.ruleForm.email+this.ruleForm.bio)
                createTeam(this.ruleForm)
                    .then((value) => {
                    const { code, message } = value
                    if (code === 200) {
                        this.$message({
                        message: '创建团队成功',
                        type: 'success'
                        })
                        setTimeout(() => {
                        this.loading = false
                        this.$router.push({name:"UserHomePage"})
                        }, 0.1 * 1000)
                    } 
                    else {
                        this.$message.error("创建团队失败，"+message)
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
    .createForm{
        margin-top: 150px;
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