<template>
    <div class="card">
        <div class="ItemMessage">
            <p class="messageP">
                {{item.message}}
            </p>
        </div>

        <div class="ItemTime">
            <p class="timeP">{{dayjs(item.date).format('YYYY/MM/DD HH:mm:ss')}} | {{item.sender}} 发给 {{item.receiver}} </p>            
        </div>
        <!-- <div class="ItemUser">
            <p class="userP">
                chen 发给 yuan 2021-5-19 10:05:19
            </p>
        </div> -->
        
        <div class="ItemResult">

            <div style="width:50%;float:left" v-if="item.result!='null'">
                <p class="resultP">
                    {{item.result}}
                </p>
            </div>
            <div style="width:50%;float:right" v-else-if="item.result=='null'">
                <div v-if="user.username!=item.receiver">
                    <p class="resultP" style="float:right">
                        等待回复中
                    </p>
                </div>
                <div v-else-if="user.username==item.receiver">
                    <b-button type="is-link" @click="makeResult()"style="float:right;margin-right:5px;margin-bottom:3px;width:80px">
                        处理
                    </b-button>
                </div>
                <!-- <el-button >处理</el-button> -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {dealAction} from "@/api/action"
export default {
    name:"InformItem",
    props:{
      item:Object
    },
    data(){
        return{
        }
    },
    computed: {
        ...mapGetters(['token', 'user'])
    },
    methods:{
        makeResult(){
            console.log("处理请求")
            this.$confirm(this.item.message+",是否同意？", '处理请求', {
                distinguishCancelAndClose: true,
                confirmButtonText: '同意',
                cancelButtonText: '拒绝'
                })
                .then(() => {
                    dealAction(this.item.id,"同意").then((res)=>{
                        const{code,message}=res
                        if(code===200){
                            //调用父组件中的刷新方法
                            this.$emit('getInform');

                            this.$message({
                                type: 'info',
                                message: '同意加入'
                            })
                        }
                        else{
                            this.$message({
                                type: 'error',
                                message: message
                            })
                        }
                    });
                })
                .catch(action => {
                    dealAction(this.item.id,"拒绝").then((res)=>{
                        const{code,message}=res
                        if(code===200){
                            //调用父组件中的刷新方法
                            this.$emit('getInform');

                            this.$message({
                            type: 'info',
                            message: '已拒绝该请求'
                            })
                        }
                        else{
                            this.$message({
                                type: 'error',
                                message: message
                            })
                        }

                    
                    });
                })
            },    
        },
}
</script>

<style scoped>
    .card{
        width:90%;
        margin-top:10px;
        margin-bottom: 20px;
        margin-left: 5%;
        margin-right: 5%;
        padding-left:5px;
    }
    .card:hover{
        box-shadow: 5px 5px 5px 10px rgba(175, 174, 240, 0.2); 
    }
    .ItemTime{
        width:100%;
    }
    .timeP{
        font-size:15px;
        font-weight: 200;
    }
    .ItemUser{
        width:100%;
    }
    .userP{
        font-size:20px;
        font-weight: 300;
    }
    .ItemMessage{
        width:100%;
    }
    .messageP{
        max-width: 471px;
        font-size:30px;
        font-weight: 500;
    }
    .ItemResult{
        width:100%;
    }
    .resultP{
        font-size:20px;
        font-weight: 350;
    }

</style>