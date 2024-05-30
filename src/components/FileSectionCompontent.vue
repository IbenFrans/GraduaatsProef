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
          <Icon icon="ic:baseline-edit" v-if="render" />
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
      <!-- <div class="files_list_extra">

        <div class="files_list_extra_description">
          <h3>Description:</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores fuga nobis reiciendis enim voluptate corrupti modi tempora laboriosam magni esse natus dolorem sed beatae, quae quod, quia nemo commodi possimus!</p>
        </div>

        <div class="files_list_extra_links">
          <h3>Links:</h3>
          <div class="files_list_extra_links_list">
            <p>Link</p>
            <p>Link</p>
            <p>Link</p>
          </div>
        </div>
        <div class="files_list_extra_tags">
          <h3>Tags:</h3>
          <div class="files_list_extra_tags_list">
            <p>tag</p>
            <p>tag</p>
            <p>tag</p>
          </div>
        </div>
      </div> -->
      <div class="files_list_items">
        <FileList :files="this.files" />
      </div>
    </div>
    </section>
</template>