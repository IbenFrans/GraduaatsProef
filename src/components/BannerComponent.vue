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
        console.log(this.selectedFile)
      if (this.selectedFile) {
        const storageRef = storage.ref(); // Reference to the root of the storage bucket
        const fileRef = storageRef.child(this.selectedFile.name); // Reference to the file name

        // custom metadata
        const metadata = {
            customMetadata: {
                'favourite' : this.favourite,
                'tags' : JSON.stringify(this.tags)
                // 'tags': this.tags.toString,
                // 'favourite': this.favourite.toString
            }
        }
        try {
            await fileRef.put(this.selectedFile, metadata);
            console.log('File uploaded');
            this.showConfirmation = false; // Hide the confirmation screen after upload
            this.resetInputs()
            this.firebaseStore.fetchFiles
        } catch (error){
            console.error('Error uploading file:' + error)
        }
        this.firebaseStore.fetchFiles
      }
    },
    cancelUpload() {
      this.showConfirmation = false;
      this.resetInputs()
    },
    loadImage() {
      let starsRef = storage.ref('branding/logo').child("MediaKitLogo.png");
      starsRef.getDownloadURL().then(url => {
        this.image = url;
      });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    addTag(tag){
        this.tags.push(tag)
        this.tag = ""
    },
    resetInputs(){
        this.image = "";
        this.selectedFile = null;
        this.tags = []
        this.tag = ""
        this.favourite = false
    }
  },
  mounted() {
    this.loadImage();
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
                <button><Icon icon="ic:baseline-add-circle"/>Add Folder</button>
                <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;">
                <button @click="triggerFileInput"><Icon icon="ic:baseline-add-circle"/>Add File</button>
            </div>
        </div>
    </div>

    <div v-if="showConfirmation" class="fileUploadScreen">
        <p>{{ this.selectedFile.name }}</p>
        <input type="text" @keyup.enter="addTag(tag)" v-model="tag" />
        <p v-for="tag in this.tags">{{ tag }}</p>
        <label for="favourite">Favourite</label>
        <input type="checkbox" name="favourite" id="favourite" v-model="favourite">
        <img :src="image" alt="">
        <button @click="uploadFile">OK</button>
        <button @click="cancelUpload">Cancel</button>
    </div>
</template>