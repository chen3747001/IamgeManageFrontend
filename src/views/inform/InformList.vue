<template>
    <div class="columns">
        <div class="column is-3">
        </div>

        <div class="column is-6">
            <el-tabs v-model="tabName" @tab-click="selectTab" :key="this.renderKey">
              <el-tab-pane label="未处理" name="notSolved">
                    <div v-for="(item, index) in InformData" :key="index">
                        <InformItem :item="item" @getInform="getInform"></InformItem>
                    </div>

                    <pagination
                        v-show="page.total > 0"
                        :total="page.total"
                        :page.sync="page.current"
                        :limit.sync="page.size"
                        @pagination="getPageActionNotSolved"
                    />
              </el-tab-pane>
              <el-tab-pane label="已处理" name="solved">
                    <div v-for="(item, index) in solvedInformData" :key="index">
                        <InformItem :item="item"></InformItem>
                    </div>

                    <pagination
                        v-show="solvedPage.total > 0"
                        :total="solvedPage.total"
                        :page.sync="solvedPage.current"
                        :limit.sync="solvedPage.size"
                        @pagination="getPageActionSolved"
                    />
              </el-tab-pane>
            </el-tabs>

            

        </div>

        <div class="column is-3">
        </div>
        
    </div>
</template>

<script>
import InformItem from"@/components/InformItem.vue"
import { mapGetters } from 'vuex'
import {showNotSolvedPageAction,showSolvedPageAction} from "@/api/action"
import Pagination from '@/components/Pagination'
export default {
    name:"InformList",
    components:{InformItem,Pagination},
    data(){
        return{
            tabName: 'solved',

            InformData:[],
            page: {
                current: 1,
                size: 3,
                total: 0,
            },

            solvedInformData:[],
            solvedPage: {
                current: 1,
                size: 3,
                total: 0,
            },

            //刷新用变量
            renderKey:0,
        }
    },

    created(){
        // this.fetchSet()
        this.getInform()
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
        //根据类别显示inform
        selectTab(tab, event) {
            this.tabName=tab.name
            console.log(tab.name)
        },

        //获得inform
        getInform(){
            this.getPageActionNotSolved()
            this.getPageActionSolved()
            this.renderKey+=1
            console.log("加载了请求信息")
        },

        //分页展示inform(未处理)
        getPageActionNotSolved(){
            console.log("开始抓取Page")
            showNotSolvedPageAction(this.page.current,this.page.size,this.user.username)
                .then((res)=>{
                    const{data}=res
                    this.page.current = data.current
                    this.page.total = data.total
                    this.page.size = data.size
                    this.InformData=data.records

                    // console.log(this.InformData)
            })
        },

        //分页展示inform(已处理)
        getPageActionSolved(){
            console.log("开始抓取Page")
            showSolvedPageAction(this.solvedPage.current,this.solvedPage.size,this.user.username)
                .then((res)=>{
                    const{data}=res
                    this.solvedPage.current = data.current
                    this.solvedPage.total = data.total
                    this.solvedPage.size = data.size
                    this.solvedInformData=data.records

                    // console.log(this.solvedInformData)
            })
        }
    }
    
}
</script>

<style scoped>

</style>