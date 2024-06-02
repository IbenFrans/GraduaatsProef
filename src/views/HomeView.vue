<script>
import Banner from '@/components/BannerComponent.vue'
import FileList from '@/components/FileListComponent.vue'
import FileCard from '@/components/FileCardComponent.vue'
import FileSection from '@/components/FileSectionCompontent.vue'
import FilterCard from '@/components/FilterCardComponent.vue'

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
        {type: "BrandGuide", icon: "baseline-format-paint", color: "#c66464"},
        {type: "Documents", icon: "baseline-insert-drive-file", color: "#d2d453"},
        {type: "PDFs", icon: "baseline-picture-as-pdf", color: "#7bc664"},
        {type: "Images", icon: "baseline-image", color: "#64AFC6"},
        {type: "Videos", icon: "baseline-play-circle", color: "#c364c6"},
      ],
    }
  },
  components:{
    Banner,
    FileList,
    FileCard,
    FileSection,
    Icon,
    FilterCard,
  },
  computed:{
    favourites(){
      return this.firebaseStore.favourites.slice(0,5)
    },
    recent(){
      return this.firebaseStore.sortDateNewToOld.slice(0,5)
    },
    allFiles(){
      return this.firebaseStore.files
    },
    folders(){
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
    <div class="fileTypeTiles">
      <FilterCard v-for="file in this.fileTypes" :type="file.type" :icon="this.iconSet + file.icon"  :color="file.color"/>
    </div>
    <FileList title="Favourites" :files="this.favourites"/>

    <FileList title="Recent" :files="this.recent"/>
    <FileSection title="All Files":files="this.allFiles"/>
    <p v-for="folder in this.folders">{{ folder }}</p>
  </main>
</template>
