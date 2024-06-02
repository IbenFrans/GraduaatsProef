<script>
import FileCard from '@/components/FileCardComponent.vue';
import storage from '@/firebase';

export default {
  props:[
    "files",
    "title",
    "cardType"
  ],
  data() {
    return {
      iconSet: "ic:",
    };
  },
  components: {
    FileCard
  },
  computed:{
    getCardType(){
      if(!this.cardType || this.cardType === "tiles"){
        return "tiles"
      } else{
        return "list"
      }
    }
  }

};
</script>

<template>
    <h2 class="h2Title" v-if="title">{{ title }}</h2>
    <div class="fileTypeTiles" v-if="!cardType || cardType === 'tiles'">
      <FileCard v-for="file in this.files" 
      :name="file.name"
      :type="file.type"
      :url="file.url"
      :favourite="file.favourite"
      :size="file.size"
      :updated="file.updated"
      :tags="file.tags"
      :cardType="getCardType"/>
    </div>
    <div class="fileTypeList" v-else>
      <FileCard v-for="file in this.files" 
      :name="file.name"
      :type="file.type"
      :url="file.url"
      :favourite="file.favourite"
      :size="file.size"
      :updated="file.updated"
      :tags="file.tags"
      :cardType="getCardType"/>
    </div>

</template>