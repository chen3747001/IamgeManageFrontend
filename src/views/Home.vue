<template>
  <div class="home">
    <div class="box"> 
      {{billboard.content}}
    </div>

    <div class="columns">
      
      <div class="column is-one-fifth">
        <NavigationBar></NavigationBar>
      </div>
      <div class="column">Auto1213</div>
      <div class="column is-one-fifth">Auto</div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import {getBillboard} from "@/api/billboard"
import NavigationBar from '@/components/layout/NavigationBar'

export default {
  name: 'Home',
  components:{NavigationBar},
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
  .column{
    width:20%;
  }
</style>>