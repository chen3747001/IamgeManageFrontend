<template>
    <div class="card">
        <div class="card-image">
            <figure class="image  is-4by3">
                <img src="@/assets/wolf.png" alt="Placeholder image">
            </figure>
        </div>

        <div class="card-content">

            <div class="content">
                <p class="title is-4">test card</p>
                <p>test</p>
                <p>one | two</p>
            </div>

            <div class="media">
                <div class="media-left">
                    <figure class="image is-32x32">
                        <img src="@/assets/logo.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-5">John Smith</p>
                </div>
            </div>
    
        </div>
    </div>
</template>

<script>
export default {
  name: "Card"
}
</script>

<style scoped>
    .card{
        width:30%;
        margin-right: 3%;
        margin-top:3%;
        float: left;
        max-height: 30%;
    }

    .card-content{
        padding-top:1px;
        padding-bottom: 1px;
    }

    .card:hover{
        box-shadow: 10px 10px 20px 10px rgba(3, 3, 3, 0.5); 
            /* 盒子向上移动效果，改变上外边距 */
        
    }
</style> 