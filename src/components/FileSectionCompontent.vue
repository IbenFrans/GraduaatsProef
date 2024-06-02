<script>
import { Icon } from "@iconify/vue"
import FileList from '@/components/FileListComponent.vue'

export default {
  data() {
    return {
      loading: true,
      dropdownFilters: [
        { name: "Name Asc", value: "nameAsc" },
        { name: "Name Desc", value: "nameDesc" },
        { name: "Size Asc", value: "sizeAsc" },
        { name: "Size Desc", value: "sizeDesc" },
        { name: "Date Asc", value: "dateAsc" },
        { name: "Date Desc", value: "dateDesc" },
      ],
      selectedFilter: "dateDesc",
      selectedCardType: "tiles",
    }
  },
  props: [
    "files",
    "title"
  ],
  components: {
    Icon,
    FileList,
  },
  computed: {
    render() {
      if (["Recent", "Favourites", "All Files"].includes(this.title)) {
        return false;
      } else {
        return true
      }
    },
  },
  methods:{
    changeToList(){
      this.selectedCardType = "list"
    },
    changeToTiles(){
      this.selectedCardType = "tiles"
    }
  },
  watch: {
    files(){
      this.loading = false
    },
    selectedFilter(filter) {
      switch (filter) {
        case "nameAsc":
          return this.files.sort((a, b) => a.name.localeCompare(b.name))
          break;
        case "nameDesc":
          return this.files.sort((a, b) => b.name.localeCompare(a.name))
          break;
        case "sizeAsc":
          return this.files.sort((a, b) => { return a.size - b.size})
          break;
        case "sizeDesc":
        return this.files.sort((a, b) => { return b.size - a.size})
          break;
        case "dateAsc":
          return this.files.sort((a, b) => new Date(a.updated) - new Date(b.updated))
          break;
        case "dateDesc":
          return this.files.sort((a, b) => new Date(b.updated) - new Date(a.updated))
          break;
        default:
          return this.files
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
        <h2 class="h2Title sectionTitle">{{ title }}</h2>
      </div>


      <div class="files_topBar_right">

        <div class="files_topBar_right_dropdown" v-if="render">
          <select name="filter" v-model="this.selectedFilter">
            <option v-for="filter in this.dropdownFilters" :key="filter.value" :value="filter.value">{{ filter.name }}
            </option>
          </select>
        </div>

        <div class="files_topBar_right_changeFormat">
          <div class="tiles" :class="{ selected: selectedCardType === 'tiles' }">
            <Icon icon="ic:baseline-apps" @click="changeToTiles()"/>
          </div>
          <div class="list" :class="{ selected: selectedCardType === 'list' }">
            <Icon icon="ic:baseline-menu" @click="changeToList()"/>
          </div>
        </div>
      </div>
    </div>

    <!-- file lijst -->
    <div class="files_list">
      <div class="files_list_items">
        <FileList v-if="this.files.length" :files="this.files" :cardType="this.selectedCardType"/>
        <h2 v-else>{{ "You dont seem to have any " + this.title.toLowerCase() }}</h2>
      </div>
    </div>
  </section>
</template>