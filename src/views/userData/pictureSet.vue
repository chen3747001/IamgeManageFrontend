
<template>
    <div class="columns">
      
      <div class="column is-3">
        <NavigationBar></NavigationBar>
      </div>
      <div class="column is-9">
        <div class="cards-header">
            <b-button
              type="is-link"
              style="float:right"
              tag="router-link"
              :to="{ path: '/pictureSet/create' }"
            >
              创建新的数据集
            </b-button>
        </div>

      <!-- 展示我的set -->
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
</template>

<script>
// @ is an alias to /src
import NavigationBar from "@/components/layout/NavigationBar"
import {showMyPictureSet,showMyPictureSetTest} from "@/api/pictureSet"
import Pagination from '@/components/Pagination'
import Card from "@/components/Card.vue"

export default {
  name: 'PictureSet',
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
    }
  },

  created(){
    // this.fetchSet()
    this.init(this.tab)
  },

  methods:{

    //显示我的数据集
    // fetchSet(){
    //   // showMyPictureSet(this.$route.params.username).then((res) => {
    //   //     const { data } = res
    //   //     console.log("=  picture set list is:")
    //   //     console.log(data)
    //   //     this.mySet = data
    //   //   })
    //   },
    init(tab) {
      showMyPictureSetTest(this.page.current, this.page.size,this.page.tab).then((response) => {
        const { data } = response
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.mySet = data.records
        // console.log(this.mySet)
      })
    },

    //根据类别显示数据集
    selectTab(tab, event) {
      this.page.tab=tab.name;
      this.init(tab);

      // console.log("选择的类别是："+tab.name);
    }
    

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

  
</style>