<script>
import FileCard from '@/components/FileCardComponent.vue';
import storage from '@/firebase';

export default {
  props:[
    "files",
    "title"
  ],
  data() {
    return {
      iconSet: "ic:",
    };
  },
  components: {
    FileCard
  },

};
</script>

<template>
    <h2 class="fileTypeTitle" v-if="title">{{ title }}</h2>
    <div class="fileTypeList">
      <FileCard v-for="file in this.files" 
      :name="file.name"
      :type="file.type"
      :url="file.url"
      :favourite="file.favourite"/>
    </div>
</template>