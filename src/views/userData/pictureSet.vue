
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

      <div class="cards-main">
        <Card></Card>
      </div>
    </div>
    </div>
</template>

<script>
// @ is an alias to /src
import NavigationBar from "@/components/layout/NavigationBar"
import Card from "@/components/Card.vue"

export default {
  name: 'PictureSet',
  components:{NavigationBar,Card},
  data() {
    return{
    }
  },

  created(){
    this.fetchBillboard()
  },

  methods:{
    async fetchBillboard(){
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
    height:1100px;
  }
</style>>