<template>
  <div class="columns py-6">
    <div class="column is-half is-offset-one-quarter">
      <el-card shadow="never">
        <div slot="header" class="has-text-centered has-text-weight-bold">
          创建数据集
        </div>
        <div>
          <el-form
            ref="ruleForm"
            v-loading="loading"
            :model="ruleForm"
            status-icon
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="数据集名称" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>

            <el-form-item label="储存方式" prop="action">
                <el-radio-group v-model="ruleForm.action" size="medium">
                <el-radio border label="默认存储"></el-radio>
                <el-radio border label="授权云存储"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="可见范围" prop="useRange">
                <el-radio-group v-model="ruleForm.useRange" size="medium">
                <el-radio border label="公开"></el-radio>
                <el-radio border label="私有"></el-radio>
                </el-radio-group>
            </el-form-item>



            

            <el-form-item>
              <el-button
                type="primary"
                @click="create(ruleForm)"
              >确认创建</el-button>
              <el-button 
                @click="returnUserPage"
                >取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { createPictureSet } from '@/api/pictureSet'
import { mapGetters } from 'vuex'
export default {
    name:"CreatePictureSet",
    data(){
        return{
            ownerName:this.$route.params.ownerName,
            loading:false,
            ruleForm:{
                ownerName:"",
                name:"",
                action:"",
                useRange:""
            },
        }
    },
    computed: {
    ...mapGetters(['token', 'user'])
    },
    methods:{
        returnUserPage(){
            this.$router.push({path:`/`})
        },
        create(fromName){
          this.ruleForm.ownerName=this.ownerName
            console.log("name is "+this.ruleForm.name+" action is"+this.ruleForm.action+" range is "+this.ruleForm.useRange)
            createPictureSet(this.ruleForm).then((value) => {
              const { code, message } = value
              if (code === 200) {
                this.$message({
                  message: '新建数据集成功',
                  type: 'success'
                })
                setTimeout(() => {
                  this.loading = false
                  this.$router.push({ path: '/' })
                }, 0.1 * 1000)
              } 
              else {
                this.$message.error("新建数据集失败"+message)
              }
            })
        }
    }
}
</script>>
</script>

<style scoped>
</style>