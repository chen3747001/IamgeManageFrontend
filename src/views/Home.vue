<template>
  <div class="home">
    <div class="box"> 
      {{billboard.content}}
    </div>

    <div class="columns">
      <div class="column is-one-fifth">is-one-fifth</div>
      <div class="column">Auto1213</div>
      <div class="column is-one-fifth">Auto</div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import {getBillboard} from "@/api/billboard"

export default {
  name: 'Home',
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
