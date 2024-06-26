import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import storage from '@/firebase'
import { deleteObject, getDownloadURL, updateMetadata } from "firebase/storage";

export const useFirebaseStore = defineStore('firebase', {
  state: () => ({
    files: [],
    folders: [],
    branding: {
      brandguide: [],
      logos: [],
      font: [],
      icons: []
    },
    imgExtensions: ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "webp", "svg", "heif", "heic"],
    docuExtensions: ["txt", "doc", "docx", "odt", "rtf", "wpd", "xls", "xlsx", "ods", "csv", "tsv", "ppt", "pptx", "odp", "key", "html", "htm", "xml", "xhtml", "epub", "mobi", "azw", "azw3", "md", "tex", "rst", "accdb", "mdb", "sqlite", "zip", "rar", "7z"],
    pdfExtensions: ["pdf", "ps", "eps",],
    vidExtensions: ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "vob", "ogv", "m4v", "3gp", "3g2", "mpg", "mpeg", "mts", "m2ts", "ts"],
  }),
  getters: {
    favourites() {
      let favourites = []
      this.files.forEach((file) => {
        if (file.favourite === "true") {
          favourites.push(file)
        }
      })
      return favourites
    },
    sortDateNewToOld() {
      return this.files.sort((a, b) => {
        return new Date(b.updated) - new Date(a.updated)
      })

    },
  },
  actions: {
    // async fetchBranding() {
    //   let brandguide = []
    //   let logos = []
    //   let colors = []
    //   let font = []
    //   let icons = {}

    //   const brandguideRef = storage.ref("/branding/brandguide")
    //   const logosRef = storage.ref("/branding/logos")
    //   const colorsRef = storage.ref("/branding/colors")
    //   const fontRef = storage.ref("/branding/font")
    //   const iconsRef = storage.ref("/branding/icons")

    //   const refList = [brandguideRef, logosRef, fontRef, iconsRef]

    //   try {
    //     for(const ref of refList){
    //       const refResult = await ref.listAll()
    //       for (const fileRef of refResult.items){
    //         const metaData = await this.getFileMetadata(fileRef)
    //         let file = {
    //           name: metaData.name,
    //           url: await this.getFileUrl(fileRef),
    //           type: metaData.type,
    //           size: metaData.size
    //         }
    //         console.log(file)
    //         if(ref == storage.ref("/branding/brandguide")){
    //           brandguide.push(file)
    //         } else if (ref == storage.ref("/branding/logos")){
    //           logos.push(file)
    //         } else if (ref == storage.ref("/branding/font")){
    //           font.push(file)
    //         } else if (ref == storage.ref("/branding/font")){
    //           font.push(file)
    //         }
    //       }
    //     }
    //     this.branding = {
    //       brandguide: this.brandguide,
    //       logos: this.logos,
    //       font: this.font,
    //       icons: this.icons
    //     }
    //     console.log(this.branding)
    //   } catch (error) {
    //     console.log(error)
    //   }

    // },
    async getFilesLocation(location) {
      try {
        const storage = getStorage();
        const listRef = ref(storage, location);
        const res = await listAll(listRef);
        for (const itemRef of res.items) {
          const fileUrl = await this.getFileUrl(itemRef);
          this.files.push({
            name: itemRef.name,
            url: fileUrl,
            size: itemRef.size,
            type: itemRef.type
          })
        };
      } catch (error) {
        this.error = error.message;
      }
    },

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
          const description = metaData.customMetadata.description
          let tags = JSON.parse(metaData.customMetadata.tags)
          if (!tags) {
            tags = ""
          }
          let links = JSON.parse(metaData.customMetadata.links)
          if (!links) {
            links = ""
          }



          const type = name.split('.').pop();
          const fileObj = {
            name: name,
            url: url,
            type: type,
            size: size,
            created: created,
            updated: updated,
            favourite: favourite,
            tags: tags,
            description: description,
            links: links
          };
          tempFileList.push(fileObj);
        }
        this.files = tempFileList;
      } catch (error) {
        console.log(error);
      }
    },

    getFile(name) {
      return this.files.find(file => file.name === name)
    },
    async fetchFolders() {
      const storageRef = storage.ref();
      const tempFolderList = []
      try {
        const result = await storageRef.listAll()
        for (const prefix of result.prefixes) {
          tempFolderList.push(prefix.fullPath)
        }
        this.folders = tempFolderList
      } catch (error) {
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
    loadImage(location, filename) {
      let starsRef = storage.ref(location).child(filename);
      console.log(starsRef)
      starsRef.getDownloadURL().then(url => {
        return url
      });
    },
    async updateFile(filename, customMetadata) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(filename);
      try {
        const metadata = {
          customMetadata: customMetadata,
          created: (new Date()).toUTCString
        };
        await fileRef.updateMetadata(metadata);
        console.log('File is updated');

        // Update local state after updating metadata
        const file = this.files.find(file => file.name === filename);
        if (file) {
          file.favourite = status;
        }
      } catch (error) {
        console.log('Error updating file:', error);
      }
    },

  },
  onCreated() {
    this.fetchFiles()
    this.fetchBranding()
  }
})