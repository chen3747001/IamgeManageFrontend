<template>
  <div class="home">

    <div class="columns">
      
      <div class="column is-3">
        <!-- <NavigationBar></NavigationBar> -->
        <p class="searchP" ><i class="el-icon-s-check"></i>  应用场景</p>
          <el-radio v-model="scenario" label="" border class="seachRadio">所有</el-radio><br>
          <el-radio v-model="scenario" label="science" border class="seachRadio">科研用</el-radio><br>
          <el-radio v-model="scenario" label="family" border class="seachRadio">家用</el-radio><br>
          <el-radio v-model="scenario" label="mixed" border class="seachRadio">混合的</el-radio><br>

        <p class="searchP"><i class="el-icon-s-data"></i>  数据分类</p>
          <el-radio v-model="dataKind" label="" border class="seachRadio">所有</el-radio><br>
          <el-radio v-model="dataKind" label="game" border class="seachRadio">游戏</el-radio><br>
          <el-radio v-model="dataKind" label="people" border class="seachRadio">人物</el-radio><br>
          <el-radio v-model="dataKind" label="scene" border class="seachRadio">景色</el-radio><br>
          <el-radio v-model="dataKind" label="photograph" border class="seachRadio">照片</el-radio><br>
          <el-radio v-model="dataKind" label="cartoon" border class="seachRadio">卡通</el-radio><br>
          <el-radio v-model="dataKind" label="mixed" border class="seachRadio">混合的</el-radio><br>
      </div>
      <div class="column is-9">
        <div class="cards-header">
            <div class="searchInput">
              <div style="float:left;width:250px;">
                <p class="control has-icons-left" >
                  <input class="input is-link" type="text" v-model="searchName" placeholder="输入数据集名称">
                  <span class="icon is-left">
                    <i class="el-icon-s-check"></i>
                  </span>
                </p>
              </div>
              <div style="float:left;width:100px;">
                <p class="control" >
                  <b-button
                    type="is-link"
                    @click="search()"
                  >搜索
                  </b-button>
                </p>
              </div>
            </div>

            <b-button
              type="is-link"
              style="float:right"
              @click="createSet"
              v-if="token != null"
            >
              创建新的数据集
            </b-button>
        </div>


        <div class="cards-main">
            <el-tabs v-model="tabName" @tab-click="selectTab">
              <el-tab-pane label="热度" name="hot">
                  <div v-for="(item, index) in mySet" :key="index">
                      <card :item="item"></card>
                  </div>
              </el-tab-pane>
              <el-tab-pane label="时间" name="time">
                  <div v-for="(item, index) in mySet" :key="index">
                      <card :item="item"></card>
                  </div>
              </el-tab-pane>
            </el-tabs>
        
            <!--分页-->
            <pagination
                v-show="page.total > 0"
                :total="page.total"
                :page.sync="page.current"
                :limit.sync="page.size"
                @pagination="init"
            />
        </div>
        
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import {getBillboard} from "@/api/billboard"
import NavigationBar from "@/components/layout/NavigationBar"
import {showPublicPictureSetTest} from "@/api/pictureSet"
import Pagination from '@/components/Pagination'
import Card from "@/components/Card.vue"

export default {
  name: 'Home',
  components:{NavigationBar,Card,Pagination},
  data() {
    return{
      mySet:{},
        testurl:"",
        tabName: 'hot',
        page: {
          current: 1,
          size: 3,
          total: 0,
          tab: 'hot'
        },
      // 数据集显示的选择条件
      scenario:"",
      dataKind:"",
      searchName:"",
    }
  },

  created(){
    this.init()
  },
  computed: {
        ...mapGetters(['token', 'user'])
    },

  methods:{
    async fetchBillboard(){
      getBillboard().then((value)=>{
        const {data} =value
        this.billboard=data
      },
      )},

    init() {
      showPublicPictureSetTest(this.page.current, this.page.size,this.page.tab,this.scenario,this.dataKind,this.searchName).then((response) => {
        const { data } = response
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.mySet = data.records

        // console.log(this.mySet)
        // console.log(this.mySet)
      })
    },

    //根据输入的关键词筛选显示数据集
    search(){
        console.log("执行搜索"+this.scenario+"=="+this.dataKind+"=="+this.searchName)
        this.init()
    },

    //根据类别显示数据集
    selectTab(tab, event) {
      this.page.tab=tab.name;
      this.init(tab);

      // console.log("选择的类别是："+tab.name);
    },

    //跳转到新建数据集页面
        createSet(){
            console.log("修改团队信息")
            this.$router.push({name:"createPictureSet",params:{ownerName:this.user.username}})
        },
  }
}
</script>

<style scoped>
  .cards-header{
    width: 100%;
    height: 40px;
  }

  .cards-main{
    width: 100%;
  }

  .searchP{
    font-size: 20px;
    font-weight: 400;
  }

  .seachRadio{
    margin-top: 10px;
    margin-left: 30px;
  }

  .searchInput{
    width: 350px;
    float: left;
  }
</style>>