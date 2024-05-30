import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import storage from '@/firebase'
import { deleteObject } from "firebase/storage";

export const useFirebaseStore = defineStore('firebase',{
  state: () => ({
      files: [],
      folders: [],
  }),
  getters:{
    favourites(){
      let favourites = []
      this.files.forEach((file) =>{
        if(file.favourite === "true"){
          favourites.push(file)
        }
      })
      return favourites
    },
    sortDateNewToOld(){
      return this.files.sort((a, b) => {
        return  new Date(b.updated) - new Date(a.updated)
      })
      
    }
  },
  actions: {
    async fetchFiles() {
      const storageRef = storage.ref();
      const tempFileList = [];
      try {
        const result = await storageRef.listAll();
        for (const fileRef of result.items) {
          const url = await this.getFileUrl(fileRef);
          const metaData = await this.getFileMetadata(fileRef)

          const name = metaData.name
          const size = metaData.size
          const created = metaData.timeCreated
          const updated = metaData.updated
          const favourite = metaData.customMetadata.favourite


          const type = name.split('.').pop();
          const fileObj = {
            name: name,
            url: url,
            type: type,
            size: size,
            created: created,
            updated: updated,
            favourite: favourite
          };
          tempFileList.push(fileObj);
        }
        this.files = tempFileList;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchFolders(){
      const storageRef = storage.ref();
      const tempFolderList = []
      try{
        const result = await storageRef.listAll()
        for(const prefix of result.prefixes){
          tempFolderList.push(prefix.fullPath)
        }
        this.folders = tempFolderList
      } catch (error){
        console.log(error)
      }
    },
    getFileUrl(imageRef) {
      return imageRef
        .getDownloadURL()
        .then(function (fileUrl) {
          return fileUrl;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getFileMetadata(fileRef) {
      return fileRef
        .getMetadata()
        .then(function (metadata) {
          return metadata;
        })
        .catch(function (error) {
          console.log(error);
          return {};
        });
    },
    getUrlImage(location, filename) {
      let starsRef = storage.ref(location).child(filename);
      starsRef.getDownloadURL().then(url => {
        this.image = url;
      });
    },
    async deleteFile(filename) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(filename);
      try {
        await fileRef.delete();
        console.log('File deleted successfully');

        // Update local state after deletion
        this.files = this.files.filter(file => file.name !== filename);
      } catch (error) {
        console.log('Error deleting file:', error);
      }
    },


  },
  onCreated(){
    this.fetchFiles()
  }
})