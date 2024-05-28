<script>
import Banner from "@/components/BannerComponent.vue"

export default{
    data(){
        return{
            title: "BrandGuide"
        }
    },
    components:{
        Banner,
    }
}
</script>

<template>
    <main>
        <Banner :title="this.title"/>
    </main>
</template>