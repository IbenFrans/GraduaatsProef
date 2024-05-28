<script>
import Banner from "@/components/BannerComponent.vue"
import FileSection from '@/components/FileSectionCompontent.vue'

export default{
    data(){
        return{

        }
    },
    components:{
        Banner,
        FileSection
    }
}
</script>

<template>
    <main>
        <Banner />
        <FileSection />
    </main>
</template>