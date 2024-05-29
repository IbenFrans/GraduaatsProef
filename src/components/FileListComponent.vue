<script>
import FileCard from '@/components/FileCardComponent.vue';
import storage from '@/firebase';
import { ref, onMounted } from 'vue';

export default {
  data() {
    return {
      iconSet: "ic:",
      files: [],
    };
  },
  props: [
    "title"
  ],
  components: {
    FileCard
  },
  setup(props, { expose }) {
    const files = ref([]);

    const fetchFiles = async () => {
        // Directory locatie
      const storageRef = storage.ref();
      const tempFileList = [];
      await storageRef
        .listAll()
        .then(async function (result) {
          for (const fileRef of result.items) {
            //name of the file
            const name = fileRef.name;
            //url of the file
            const url = await getFileUrl(fileRef);
            //filetype of the file
            const type = name.split('.').pop()
            //creating object with name and url
            const fileObj = {
              name,
              url,
              type
            };
            console.log("File: " + fileObj.fileName);
            tempFileList.push(fileObj);
          }
          files.value = tempFileList;
        })
        .catch(function (error) {
          // handle errors
          console.log(error);
        });
    };

    const getFileUrl = (imageRef) => {
      return imageRef
        .getDownloadURL()
        .then(function (fileUrl) {
          return fileUrl;
        })
        .catch(function (error) {
          // handle errors
          console.log(error);
          return "";
        });
    };

    onMounted(() => {
      fetchFiles();
    });

    expose({
      fetchFiles
    });

    return {
      files,
      fetchFiles
    };
  },
};
</script>

<template>
    <h2 class="fileTypeTitle" v-if="title">{{ title }}</h2>
    <div class="fileTypeList">
      <FileCard v-for="file in this.files" 
      :name="file.name"
      :type="file.type"
      :url="file.url"/>
    </div>
</template>