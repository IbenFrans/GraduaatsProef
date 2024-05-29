<script>
import Banner from '@/components/BannerComponent.vue'
import FileList from '@/components/FileListComponent.vue'
import FileCard from '@/components/FileCardComponent.vue'
import FileSection from '@/components/FileSectionCompontent.vue'

import { Icon } from "@iconify/vue"
import { iconExists } from 'iconify-icon'

export default{
  data(){
    return{
      iconSet: "ic:",

      fileTypes: [
        {type: "BrandGuide", icon: "baseline-format-paint"},
        {type: "Documents", icon: "baseline-insert-drive-file"},
        {type: "PDFs", icon: "baseline-picture-as-pdf"},
        {type: "Images", icon: "baseline-image"},
        {type: "Videos", icon: "baseline-play-circle"},
      ],

      // favourites:[
      //   {name: "Design", type: "Dir", items: 12, icon: "baseline-folder"},
      //   {name: "Logo.png", type: "PNG", icon: "baseline-image"},
      //   {name: "Backgrounds", type: "Dir", items: 6, icon: "baseline-folder"},
      // ],
      // files:[
      // {type: "BrandGuide", icon: "baseline-format-paint"},
      //   {type: "Documents", icon: "baseline-insert-drive-file"},
      //   {type: "PDFs", icon: "baseline-picture-as-pdf"},
      //   {type: "Images", icon: "baseline-image"},
      //   {type: "Videos", icon: "baseline-play-circle"},
      //   {type: "BrandGuide", icon: "baseline-format-paint"},
      //   {type: "Documents", icon: "baseline-insert-drive-file"},
      //   {type: "PDFs", icon: "baseline-picture-as-pdf"},
      //   {type: "Images", icon: "baseline-image"},
      //   {type: "Videos", icon: "baseline-play-circle"},
      //   {type: "BrandGuide", icon: "baseline-format-paint"},
      //   {type: "Documents", icon: "baseline-insert-drive-file"},
      //   {type: "PDFs", icon: "baseline-picture-as-pdf"},
      //   {type: "Images", icon: "baseline-image"},
      //   {type: "Videos", icon: "baseline-play-circle"},
      // ]
    }
  },
  components:{
    Banner,
    FileList,
    FileCard,
    FileSection,
    Icon,
  }
}

</script>

<template>
  <main>
    <Banner />
    <div class="fileTypeList">
      <FileCard v-for="file in this.fileTypes" :type="file.type" :icon="this.iconSet + file.icon" />
    </div>

    <FileList title="Favourites" :items="this.favourites" />
    <FileList title="Recent" :items="this.favourites" />

    <FileSection :files="this.files"/>

  </main>
</template>
