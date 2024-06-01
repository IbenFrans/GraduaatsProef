<script>
import { Icon } from "@iconify/vue"
import FileList from '@/components/FileListComponent.vue'

export default{
    props:[
        "files",
        "title"
    ],
    components:{
        Icon,
        FileList,
    },
    computed:{
      render(){
        if(["Recent", "Favourites"].includes(this.title)){
          return false;
        } else{
          return true
        }
      }
    }
}
</script>


<template>
    <section>
      <!-- Files TopBar -->
      <div class="files_topBar">


        <div class="files_topBar_left">
          <h2>{{ title }}</h2>
        </div>


        <div class="files_topBar_right">

          <div class="files_topBar_right_dropdown" v-if="render">
            <select name="filter">
              <option value="naam">Naam</option>
              <option value="grootte">Grootte</option>
              <option value="datum">Datum</option>
            </select>
          </div>

          <div class="files_topBar_right_changeFormat">
            <div class="tiles selected">
              <Icon icon="ic:baseline-apps"/>
            </div>
            <div class="list">
              <Icon icon="ic:baseline-menu"/>
            </div>
          </div>
        </div>
      </div>

      <!-- file lijst -->
    <div class="files_list">
      <div class="files_list_items">
        <FileList :files="this.files" />
      </div>
    </div>
    </section>
</template>