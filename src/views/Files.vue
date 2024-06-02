<script>
import Banner from "@/components/BannerComponent.vue"
import FileSection from '@/components/FileSectionCompontent.vue'

import { useFirebaseStore } from "@/stores/firebaseStore.js"

export default {
    data() {
        return {
            firebaseStore: useFirebaseStore(),
            files: [],
            imgExtensions: ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "webp", "svg", "heif", "heic"],
            docuExtensions: ["txt", "doc", "docx", "odt", "rtf", "wpd", "xls", "xlsx", "ods", "csv", "tsv", "ppt", "pptx", "odp", "key", "html", "htm", "xml", "xhtml", "epub", "mobi", "azw", "azw3", "md", "tex", "rst", "accdb", "mdb", "sqlite", "zip", "rar", "7z"],
            pdfExtensions: ["pdf", "ps", "eps",],
            vidExtensions: ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "vob", "ogv", "m4v", "3gp", "3g2", "mpg", "mpeg", "mts", "m2ts", "ts"],



        }
    },
    components: {
        Banner,
        FileSection,
    },
    computed: {
        getTitle() {
            if (this.filter === "All") {
                return "All files"
            } else {
                return this.filter
            }
        },
        filter() {
            return this.$route.params.filter
        }
    },
    methods: {
        async getFiles() {
            try {
                if (this.filter === "All") {
                    this.files = this.firebaseStore.files
                } else if (this.filter === "Documents") {
                    this.files = this.firebaseStore.files.filter(file => {
                        const extension = file.type
                        return this.files = this.docuExtensions.includes(extension)
                    }
                    )
                } else if (this.filter === "PDFs") {
                    this.files = this.firebaseStore.files.filter(file => {
                        const extension = file.type
                        return this.files = this.pdfExtensions.includes(extension)
                    }
                    )
                } else if (this.filter === "Images") {
                    this.files = this.firebaseStore.files.filter(file => {
                        const extension = file.type
                        return this.files = this.imgExtensions.includes(extension)
                    }
                    )
                } else if (this.filter === "Videos") {
                    this.files = this.firebaseStore.files.filter(file => {
                        const extension = file.type
                        return this.files = this.vidExtensions.includes(extension)
                    }
                    )
                }
            } catch (error) {
                console.log(error)
            }
        },
    },
    created() {
        this.firebaseStore.fetchFiles()
        this.getFiles()
    }
}
</script>

<template>
    <main>
        <Banner />
        <FileSection :title="getTitle" :files="this.files" />
    </main>
</template>