<script>
import FileCard from '@/components/FileCardComponent.vue'

export default {
    data(){
        return{
            iconSet: "ic:",
        }
    },
    props:[
        "title",
        "items"
    ],
    components:{
        FileCard
    }
}
</script>

<template>
    <h2 class="fileTypeTitle" v-if="title">{{ title }}</h2>
    <div class="fileTypeList">
      <FileCard v-for="file in items" :type="file.type" :icon="this.iconSet + file.icon" />
    </div>
</template>