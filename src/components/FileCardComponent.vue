<script>
import { Icon } from "@iconify/vue"
import { useFirebaseStore } from "@/stores/firebaseStore.js"
import { format } from "date-fns"

export default {
    data() {
        return {
            firebaseStore: useFirebaseStore()
        }
    },
    props: {
        name: String,
        type: String,
        url: String,
        favourite: String,
        cardType: String,
        size: Number,
        updated: String,
        tags: Array
    },
    components: {
        Icon
    },
    computed: {
        getIcon() {
            if (this.firebaseStore.imgExtensions.includes(this.type)) {
                return "ic:baseline-image"
            } else if (this.firebaseStore.docuExtensions.includes(this.type)) {
                return "ic:baseline-insert-drive-file"
            } else if (this.firebaseStore.pdfExtensions.includes(this.type)) {
                return "ic:baseline-picture-as-pdf"
            } else if (this.firebaseStore.vidExtensions.includes(this.type)){
                return "ic:baseline-play-circle"
            }
        },
        getUrl() {
            if (["jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "webp", "svg", "heif", "heic"].includes(this.type)) {
                return this.url
            }
        },
        dynamicName() {
            if (this.name && this.name.length > 25) {
                return this.name.substr(0, 9) + "..." + this.name.substr(this.name.length - 9, this.name.length)
            } else {
                return this.name
            }
        },
        getDetailPath() {
            return "/Files/Detail/" + this.name
        }
    },
    methods: {
        deleteFile() {
            this.firebaseStore.deleteFile(this.name)
        },
        fileSizeFormat(size) {
            if (size < 1024) { return size + " Bytes" }
            else if (size < 1024 ** 2) { return (size / 1024).toFixed(2) + " KB" }
            else if (size < 1024 ** 3) { return (size / 1024 ** 2).toFixed(2) + " MB" }
            else if (size < 1024 ** 4) { return (size / 1024 ** 3).toFixed(2) + " GB" }
            else if (size < 1024 ** 5) { return (size / 1024 ** 4).toFixed(2) + " TB" }
            else { return "Not found" }
        },
        formattedDate(dateString) {
            const fileDate = new Date(dateString)
            return format(fileDate, "dd MM yyyy, HH:mm")
        },
    }

}

</script>

<template>
    <router-link :to="getDetailPath">
        <div class="fileType" v-if="cardType === 'tiles'">
            <div class="fileType_background" :style="{ backgroundImage: 'url(' + this.getUrl + ')' }">
                <div v-if="this.getIcon" class="fileType_circleIcon">
                    <Icon :icon="this.getIcon" />
                </div>
            </div>
            <p>{{ dynamicName }}</p>
        </div>
        <div class="fileTypeListMode" v-else>
            <div class="name">
                <Icon :icon="this.getIcon" />
                <p>{{ this.dynamicName }}</p>
            </div>
            <p class="data">{{ this.fileSizeFormat(this.size) }}</p>
            <p class="data">{{ this.formattedDate(this.updated) }}</p>
            <div v-if="this.tags.length" class="tags">
                <p class="tag" v-for="tag in this.tags.slice(0,2)">{{ tag }}</p>
            </div>
            <p class="data" v-else >No tags</p>
        </div>
    </router-link>
</template>
