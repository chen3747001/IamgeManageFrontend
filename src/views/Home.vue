<template>
  <div class="home">
    <div class="box"> 
      {{billboard.content}}
    </div>

    <div class="columns">
      
      <div class="column is-3">
        <NavigationBar></NavigationBar>
      </div>
      <div class="column is-9">
        <div class="cards-header">热度  时间</div>
        <div class="cards-main">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
        
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import {getBillboard} from "@/api/billboard"
import NavigationBar from "@/components/layout/NavigationBar"
import Card from "@/components/Card.vue"

export default {
  name: 'Home',
  components:{NavigationBar,Card},
  data() {
    return{
      billboard:{
        content:''
      }
    }
  },

  created(){
    this.fetchBillboard()
  },

  methods:{
    async fetchBillboard(){
      getBillboard().then((value)=>{
        const {data} =value
        this.billboard=data
      }

      )
    }
  }
}
</script>

<style scoped>
  .cards-header{
    width: 100%;
    height: 20px;
  }

  .cards-main{
    width: 100%;
    height:1100px;
  }
</style>>