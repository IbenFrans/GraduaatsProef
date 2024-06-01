<script>
import Banner from "@/components/BannerComponent.vue"
import FileSection from '@/components/FileSectionCompontent.vue'

import { useFirebaseStore } from "@/stores/firebaseStore.js"

export default {
    data() {
        return {
            firebaseStore: useFirebaseStore(),
            files: []
        }
    },
    components: {
        Banner,
        FileSection,
    },
    computed: {
        allFiles() {
            return this.firebaseStore.files
        },
    },
    created() {
        this.firebaseStore.fetchFiles()
    }
}
</script>

<template>
    <main>
        <Banner />
        <FileSection title="All Files" :files="this.allFiles" />
    </main>
</template>