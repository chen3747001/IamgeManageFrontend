<template>
<!-- contianer 是buefy 的一个样式，将页面变成一个容器，页面居中对齐 -->
  <div>
    <div class="mb-5">
      <Header></Header>
    </div>

    <div class="container context">
        <router-view :key="this.$route.fullPath"></router-view>
    </div>

    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
export default {
  name: "App",
  components: { Header,Footer },
};
</script>
<style scoped>
.container {
  min-height: 200px;
}
