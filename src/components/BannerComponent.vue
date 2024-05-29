<script>
import storage from '@/firebase'
import { ref } from "vue"

export default{
    data(){
        return{
            image: ""
        }
    },
    props: [
        "title"
    ],
    setup(){
        const selectedFile = ref(null);

        const handleFileUpload = (event) =>{
            const file = event.target.files[0]
            selectedFile.value = file;
        }

        const uploadFile = async () => {
            if(selectedFile.value){
                const storageRef = storage.ref() // Reference to the root of the storage bucket
                const fileRef = storageRef.child(selectedFile.value.name) // Reference to the file name
                await fileRef.put(selectedFile.value)


                console.log('File uploaded')
            }
        }
        return{
            handleFileUpload,
            uploadFile,
        }
    },
    methods:{
        loadImage(){
            let starsRef = storage.ref().child('hard.jpg')
            console.log(storage.ref())

            starsRef.getDownloadURL().then(
                url => {
                    this.image = url;
                }
            )
        }
    }
}
</script>

<template>
    <img :src="image"/>
    <button @click="loadImage">ShowImage</button>
    <div class="banner">
        <img src="@/assets/MediaKitLogo.png" alt="" class="logo">
        <div>
            <h1 v-if="title">{{ title }}</h1>
            <div v-else class="banner_buttons">
                <button>Add Folder</button>
                <input type="file" @change="handleFileUpload">
                <button @click="uploadFile">Add File</button>
            </div>
        </div>
    </div>
</template>