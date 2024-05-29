<script>
import { Icon } from "@iconify/vue"

export default{
    props:[
        "name",
        "type",
        "url"
    ],
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
        }
    }

}

</script>

<template>
    <div class="fileType">
        <div class="fileType_background" :style="{ backgroundImage: 'url(' + this.getUrl + ')' }" >
            <div v-if="this.getIcon" class="fileType_circleIcon">
                <Icon :icon="this.getIcon" />
            </div>
        </div>
        <p>{{ name }}</p>
    </div>
</template>
