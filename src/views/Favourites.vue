<script>
import Banner from "@/components/BannerComponent.vue"
import FileSection from '@/components/FileSectionCompontent.vue'

import { useFirebaseStore } from "@/stores/firebaseStore.js"

export default{
    data(){
        return{
            firebaseStore: useFirebaseStore(),
            title: "Favourites",
            files: []
        }
    },
    components:{
        Banner,
        FileSection
    },
    created() {
        const firebaseStore = useFirebaseStore();
        firebaseStore.fetchFiles().then(() => {
            this.files = firebaseStore.favourites;
        });
    }
}
</script>

<template>
    <main>
        <Banner />
        <FileSection :title="this.title" :files="this.files"/>
    </main>
</template>