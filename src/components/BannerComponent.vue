<script>
import storage from '@/firebase';
import { Icon } from "@iconify/vue";
import { useFirebaseStore } from "@/stores/firebaseStore.js"


export default {
  data() {
    return {
      selectedFile: null,
      tag: "",
      tags: [],
      favourite: false,
      image: "",
      description: "",
      links: [],
      linkname: "",
      linkurl: "",
      showConfirmation: false,

      firebaseStore: useFirebaseStore()
    };
  },
  props: [
    "title"
  ],
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.selectedFile = file;
      this.image = URL.createObjectURL(file);
      this.showConfirmation = true;
    },
    async uploadFile() {
      if (this.selectedFile) {
        const storageRef = storage.ref(); // Reference to the root of the storage bucket
        const fileRef = storageRef.child(this.selectedFile.name); // Reference to the file name

        // custom metadata
        const metadata = {
          customMetadata: {
            'favourite': this.favourite,
            'tags': JSON.stringify(this.tags),
            'description': this.description,
            'links': JSON.stringify(this.links)
          }
        }
        try {
          await fileRef.put(this.selectedFile, metadata);
          console.log('File uploaded');
          this.showConfirmation = false; // Hide the confirmation screen after upload
          this.resetInputs()
        } catch (error) {
          console.error('Error uploading file:' + error)
        }
        this.firebaseStore.fetchFiles
      }
    },
    cancelUpload() {
      this.showConfirmation = false;
      this.resetInputs()
    },
    loadImage(location, filename) {
      let starsRef = storage.ref(location).child(filename);
      starsRef.getDownloadURL().then(url => {
        this.image = url;
      });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    addTag(tag) {
      if(tag.trim()){
        this.tags.push(tag)
        this.tag = ""
      }
    },
    addLink(name, url) {
      if (name && url) {
        if (!name) {
          name = url
        }
        let link = {
          name: name,
          url: "https://" + url
        }
        this.links.push(link)
        this.linkname = "",
          this.linkurl = ""
      }
    },
    resetInputs() {
      this.image = "";
      this.selectedFile = null;
      this.tags = []
      this.tag = ""
      this.favourite = false
    }
  },
  mounted() {
    this.loadImage('branding/logo', "MediaKitLogo.png")
  },
  components: {
    Icon
  }
};
</script>
<template>
  <div class="banner">
    <router-link to="/">
      <img :src="image" alt="" class="logo">
    </router-link>
    <div>
      <h1 v-if="title">{{ title }}</h1>
      <div v-else class="banner_buttons">
        <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;">
        <button @click="triggerFileInput">
          <Icon icon="ic:baseline-add-circle" />Add File
        </button>
      </div>
    </div>
  </div>

  <div v-if="showConfirmation" class="fileUploadScreen">
    <label>{{ this.selectedFile.name }}</label>
    <input v-model="this.selectedFile.name"></input>
    <input type="text" @keyup.enter="addTag(tag)" v-model="tag" />
    <p v-for="tag in this.tags">{{ tag }}</p>
    <label for="favourite">Favourite</label>
    <input type="checkbox" name="favourite" id="favourite" v-model="this.favourite">
    <img :src="image" alt="">
    <textarea v-model="this.description"></textarea>
    <label for="linkname">Linkname</label>
    <input v-model="this.linkname" type="text">
    <label for="linkurl">Linkurl https://</label>
    <input v-model="this.linkurl" type="text">
    <button @click="addLink(this.linkname, this.linkurl)">add link</button>
    <p>Links</p>
    <a v-for="link in links" :href="link.url">{{ link.name }}</a>

    <button @click="uploadFile">OK</button>
    <button @click="cancelUpload">Cancel</button>
  </div>
</template>