<template>
    <main>
        <h1>File List</h1>
        <div v-if="error">{{ error }}</div>
        <div v-else>
            <div v-if="folders.length > 0">
                <h2>Folders</h2>
                <ul>
                    <li v-for="(folder, index) in folders" :key="index">{{ folder.name }}</li>
                </ul>
            </div>
            <div v-if="files.length > 0">
                <h2>Files</h2>
                <ul>
                    <li v-for="(file, index) in files" :key="index">{{ file.name }}</li>
                </ul>
            </div>
        </div>
        <p>test</p>
        <p v-for="file in this.test">{{ file.name + " " + file.size }}</p>
    </main>
</template>

<script>
import { getStorage, ref, listAll, getMetadata } from "firebase/storage";
import { useFirebaseStore } from "@/stores/firebaseStore.js"

export default {
    data() {
        return {
            folders: [],
            files: [],
            test: [],
            error: null,
            firebaseStore: useFirebaseStore()
        };
    },
    created() {
        this.test = this.getFilesLocation("branding/logo");
    },
    methods: {
        listFiles() {
            const storage = getStorage();
            const listRef = ref(storage, 'assets');

            listAll(listRef)
                .then((res) => {
                    res.prefixes.forEach((folderRef) => {
                        // All the prefixes under listRef.
                        // You may call listAll() recursively on them if needed.
                        this.folders.push({ name: folderRef.name, fullPath: folderRef.fullPath });
                        console.log(this.folders)
                    });
                    res.items.forEach((itemRef) => {
                        // All the items under listRef.
                        this.files.push({ name: itemRef.name, fullPath: itemRef.fullPath });
                    });
                })
                .catch((error) => {
                    // Uh-oh, an error occurred!
                    this.error = error.message;
                });
        },
        async getFilesLocation(location) {
            try {
                const storage = getStorage();
                const listRef = ref(storage, location);
                const res = await listAll(listRef);
                res.items.forEach((itemRef) => {
                    const metadata = this.getFileMetadata(itemRef)
                    this.files.push({
                        name: itemRef.name,
                        size: metadata.size
                    });
                });
            } catch (error) {
                this.error = error.message;
            }
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
    },
};
</script>

<style>
/* Add your styles here if needed */
</style>