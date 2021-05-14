<template>
    <div>
        <p>member manage--{{teamName}}</p>
    </div>
</template>

<script>
export default {
    name:"memberManage",
    data(){
        return{
            teamName:this.$route.params.teamName,
        }
    }
}
</script>
<style scoped>

</style>