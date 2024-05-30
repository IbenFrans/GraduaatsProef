<script>
import Banner from '@/components/BannerComponent.vue'
import FileList from '@/components/FileListComponent.vue'
import FileCard from '@/components/FileCardComponent.vue'
import FileSection from '@/components/FileSectionCompontent.vue'

import { Icon } from "@iconify/vue"
import { iconExists } from 'iconify-icon'

import { useFirebaseStore } from "@/stores/firebaseStore.js"

export default{
  data(){
    return{
      firebaseStore: useFirebaseStore(),
      iconSet: "ic:",
      files: [],

      fileTypes: [
        {type: "BrandGuide", icon: "baseline-format-paint"},
        {type: "Documents", icon: "baseline-insert-drive-file"},
        {type: "PDFs", icon: "baseline-picture-as-pdf"},
        {type: "Images", icon: "baseline-image"},
        {type: "Videos", icon: "baseline-play-circle"},
      ],
    }
  },
  components:{
    Banner,
    FileList,
    FileCard,
    FileSection,
    Icon,
  },
  computed:{
    favourites(){
      return this.firebaseStore.favourites
    },
    recent(){
      return this.firebaseStore.sortDateNewToOld
    },
    allFiles(){
      return this.firebaseStore.files
    },
    folders(){
      console.log(this.firebaseStore.folders)
      return this.firebaseStore.folders
    }
  },
  created() {
        const firebaseStore = useFirebaseStore();
        firebaseStore.fetchFiles().then(() => {
            this.files = firebaseStore.fetchFiles;
        });
    }
}

</script>

<template>
  <main>
    <Banner />
    <div class="fileTypeList">
      <FileCard v-for="file in this.fileTypes" :type="file.type" :icon="this.iconSet + file.icon" />
    </div>
    <FileList title="Favourites" :files="this.favourites"/>

    <FileList title="Recent" :files="this.recent"/>
    <FileSection title="All Files":files="this.allFiles"/>
    <p v-for="folder in this.folders">{{ folder }}</p>
  </main>
</template>
