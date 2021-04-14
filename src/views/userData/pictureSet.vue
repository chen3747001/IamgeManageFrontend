
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
        <div v-for="(item, index) in mySet" :key="index">
          <card :item="item"></card>
        </div>
        
    </div>

    </div>
    </div>
</template>

<script>
// @ is an alias to /src
import NavigationBar from "@/components/layout/NavigationBar"
import {showMyPictureSet} from "@/api/pictureSet"
import Card from "@/components/Card.vue"

export default {
  name: 'PictureSet',
  components:{NavigationBar,Card},
  data() {
    return{
        mySet:{},
        testurl:""
    }
  },

  created(){
    this.fetchSet()
  },

  methods:{

    //显示我的数据集
    fetchSet(){
      showMyPictureSet(this.$route.params.username).then((res) => {
          const { data } = res
          console.log("=  picture set list is:")
          console.log(data)
          this.mySet = data
        })
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
    height:1100px;
  }

  
</style>