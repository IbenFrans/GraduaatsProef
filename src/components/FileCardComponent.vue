<script>
import { Icon } from "@iconify/vue"
import { useFirebaseStore } from "@/stores/firebaseStore.js"

export default{
   data(){
    return{
        firebaseStore: useFirebaseStore()
    }
   },
    props:{
        name: String,
        type: String,
        url: String,
        favourite: String

    },
    components:{
        Icon
    },
    computed:{
        getIcon(){
            if(this.type == "jpg"){
                return ""
            } else if ( this.type == "docx"){
                return "ic:baseline-insert-drive-file"
            } else if (["zip", "rar"].includes(this.type)){
                return "ic:baseline-folder-zip"
            }
        },
        getUrl(){
            if(["jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "webp", "svg", "heif", "heic"].includes(this.type)){
                return this.url
            }
        },
        dynamicName(){
            if(this.name && this.name.length > 25){
                return this.name.substr(0,10) + "..." + this.name.substr(this.name.length-10, this.name.length)
            } else{
                return this.name
            }
        }
    },
    methods:{
        deleteFile(){
            this.firebaseStore.deleteFile(this.name)
        }
    }

}

</script>

<template>
    <div class="fileType" @click="deleteFile">
        <div class="fileType_background" :style="{ backgroundImage: 'url(' + this.getUrl + ')' }" >
            <div v-if="this.getIcon" class="fileType_circleIcon">
                <Icon :icon="this.getIcon" />
            </div>
        </div>
        <p>{{ dynamicName }}</p>
    </div>
</template>
