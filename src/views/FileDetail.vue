<script>
import { useFirebaseStore } from "@/stores/firebaseStore.js"
import Banner from '@/components/BannerComponent.vue'
import { Icon } from "@iconify/vue"
import { format } from "date-fns"

export default {
    data() {
        return {
            filteredFile: null,
            favourite: false,
            loading: true,
            firebaseStore: useFirebaseStore(),
            location: "/",
            edit: false,
            newMetaData: {
                tags: [],
                favourite: false,
                links: [],
                description: ""
            },
            newTag: "",
            newLinkName: "",
            newLinkUrl: ""
        };
    },
    components: {
        Banner,
        Icon,
    },
    computed: {
        files() {
            const firebaseStore = useFirebaseStore();
            return firebaseStore.files;
        },
    },
    watch: {
        files: 'findFile'
    },
    methods: {
        findFile() {
            if (this.files.length > 0) {
                this.filteredFile = this.files.find(file => file.name === this.$route.params.name) || null;
                this.loading = false;
            }
        },
        async fetchAndFindFile() {
            await this.firebaseStore.fetchFiles();
            this.findFile();
        },
        formattedDate(dateString) {
            const fileDate = new Date(dateString)
            return format(fileDate, "dd MMMM yyyy, HH:mm")
        },
        fileSizeFormat(size) {
            if (size < 1024) { return size + " Bytes" }
            else if (size < 1024 ** 2) { return (size / 1024).toFixed(2) + " KB" }
            else if (size < 1024 ** 3) { return (size / 1024 ** 2).toFixed(2) + " MB" }
            else if (size < 1024 ** 4) { return (size / 1024 ** 3).toFixed(2) + " GB" }
            else if (size < 1024 ** 5) { return (size / 1024 ** 4).toFixed(2) + " TB" }
            else { return "Not found" }
        },
        favouriteIcon() {
            if (this.filteredFile.favourite === "true" || this.newMetaData.favourite === "true") {
                return "ic:baseline-star"
            } else {
                return "ic:baseline-star-border"
            }
        },
        async toggleFavourite() {
            let newMetaData = {}
            try {
                if (this.filteredFile.favourite === "true") {
                    newMetaData = {
                        favourite: false
                    }
                } else {
                    console.log(this.filteredFile.favourite)
                    newMetaData = {
                        favourite: true
                    }
                }
                this.firebaseStore.updateFile(this.filteredFile.name, newMetaData)

            } catch (error) {
                console.log(error)
            }
        },
        async deleteFile() {
            try {
                this.firebaseStore.deleteFile(this.filteredFile.name)
                console.log("File deleted")
            } catch (error) {
                console.log(error)
            }
        },
        goToEditMode() {
            this.edit = true
            this.newMetaData.favourite = this.filteredFile.favourite
            this.newMetaData.tags = this.filteredFile.tags
            this.newMetaData.links = this.filteredFile.links
            this.newMetaData.description = this.filteredFile.description
        },
        addTag() {
            if (this.newTag.trim()) {
                this.newMetaData.tags.push(this.newTag)
                this.newTag = ""
            }
        },
        removeTag(index) {
            this.newMetaData.tags.splice(index, 1)
        },
        addLink() {
            if (this.newLinkUrl.trim()) {
                if (!this.newLinkName) {
                    this.newLinkName = this.newLinkUrl
                }
                const link = { name: this.newLinkName, url: "https://" + this.newLinkUrl }
                this.newMetaData.links.push(link)
                this.newLinkName = ""
                this.newLinkUrl = ""
            }
        },
        removeLink(index) {
            this.newMetaData.links.splice(index, 1)
        },
        cancelUpdate() {
            this.newMetaData.favourite = false
            this.newMetaData.tags = []
            this.newMetaData.links = []
            this.newMetaData.description = ""
            this.edit = false
        },
        async updateFile() {
            try {
                this.newMetaData.tags = JSON.stringify(this.newMetaData.tags)
                this.newMetaData.links = JSON.stringify(this.newMetaData.links)
                this.newMetaData.description = this.newMetaData.description.trim()
                this.firebaseStore.updateFile(this.filteredFile.name, this.newMetaData)

                //update local file
                this.filteredFile.tags = JSON.parse(this.newMetaData.tags)
                this.filteredFile.links = JSON.parse(this.newMetaData.links)
                this.filteredFile.favourite = this.newMetaData.favourite
                this.filteredFile.description = this.newMetaData.description
                this.filteredFile.updated = this.formattedDate(new Date())

                //reset newMetadata
                this.newMetaData = {
                    tags: [],
                    favourite: false,
                    links: [],
                    description: ""
                },
                    this.cancelUpdate()
            } catch (error) {
                console.log(error)
            }

        }

    },watch: {
    '$route.params.name': {
      immediate: true,
      handler() {
        this.findFile();
      }
    }
  },
    mounted() {
        if (this.files.length === 0 || this.filteredFile.name !== this.$route.params.name) {
            this.fetchAndFindFile();
        } else {
            this.findFile();
        }
        this.edit = false;
    }
};
</script>

<template>
    <main>
        <Banner />
        <div class="fileDetailTopBanner" v-if="filteredFile">
            <h3 v-if="!edit" class="fileDetailName">{{ filteredFile.name }}</h3>
            <input v-else type="text" name="inputName" v-model="filteredFile.name">
            <div class="fileDetailTopBanner_icons">
                <Icon v-if="!edit" icon="ic:baseline-edit" @click="goToEditMode" />
                <Icon v-if="edit" icon="ic:baseline-check-circle" @click="updateFile()" />
                <Icon v-if="edit" icon="ic:baseline-cancel" @click="cancelUpdate()" />
                <Icon :icon="favouriteIcon()" @click="toggleFavourite()"/>
            </div>
        </div>
        <div class="fileDetail">
            <div v-if="loading">Loading...</div>
            <div v-else-if="filteredFile">
                <div class="fileDetail_imgdetails">
                    <img :src="filteredFile.url" :alt="filteredFile.name">
                    <div class="fileDetail_imgdetails_details">
                        <div>
                            <div class="detailItem">
                                <Icon icon="ic:baseline-insert-drive-file" />
                                <div>
                                    <p class="title">Filetype:</p>
                                    <p>{{ filteredFile.type }}</p>
                                </div>
                            </div>
                            <div class="detailItem">
                                <Icon icon="ic:baseline-expand" />
                                <div>
                                    <p class="title">Size:</p>
                                    <p>{{ fileSizeFormat(Number(filteredFile.size)) }}</p>
                                </div>
                            </div>
                            <div class="detailItem">
                                <Icon icon="ic:baseline-access-time" />
                                <div>
                                    <p class="title">Last updated:</p>
                                    <p>{{ formattedDate(filteredFile.updated) }}</p>
                                </div>
                            </div>
                            <div class="detailItem">
                                <Icon icon="ic:baseline-access-time" />
                                <div>
                                    <p class="title">Created:</p>
                                    <p>{{ formattedDate(filteredFile.created) }}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="detailItem detailButton">
                                <Icon icon="ic:baseline-download" />
                                <div><a :href="this.filteredFile.url" :download="this.filteredFile.name"
                                        target="_blank">Download</a></div>
                            </div>
                            <div class="detailItem detailButton">
                                <Icon icon="ic:baseline-delete" />
                                <div @click="deleteFile()">Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fileDetail_extraDetails">
                    <div v-if="this.filteredFile.description || edit" class="detailItem">
                        <div>
                            <p class="title">Description:</p>
                            <p v-if="!edit">{{ this.filteredFile.description }}</p>
                            <textarea v-else v-model="this.newMetaData.description" name="fileDescription" cols="30"
                                rows="10"></textarea>
                        </div>
                    </div>
                    <div v-if="this.filteredFile.tags.length || edit" class="detailItem">
                        <div>
                            <p class="title">Tags:</p>
                            <div class="tags">
                                <div v-if="!edit" class="tag" v-for="tag in this.filteredFile.tags">
                                    <p>{{ tag }}</p>
                                </div>
                                <div v-if="edit" class="tag" v-for="(tag, index) in this.newMetaData.tags" :key="index">
                                    <p>{{ tag }}</p>
                                    <Icon v-if="edit" icon="ic:baseline-clear" @click="removeTag(index)" />
                                </div>
                                <input @keyup.enter="addTag()" v-if="edit" v-model="this.newTag" type="text"
                                    class="tag">
                                <Icon v-if="edit" icon="ic:baseline-add" @click="addTag()" />
                            </div>
                        </div>
                    </div>
                    <div v-if="this.filteredFile.links.length || edit" class="detailItem">
                        <div>
                            <p class="title">Links:</p>
                            <div class="links">
                                <ul class="links">
                                    <li v-if="!edit" v-for="link in this.filteredFile.links" class="link">
                                        <a :href="link.url" target="_blank">{{ link.name }}</a>
                                    </li>
                                    <li v-if="edit" v-for="(link, index) in this.newMetaData.links" :key="index"
                                        class="link">
                                        <a :href="link.url" target="_blank">{{ link.name }}</a>
                                        <Icon v-if="edit" icon="ic:baseline-clear" @click="removeLink(index)" />
                                    </li>
                                    <div v-if="edit" class="linkEdit">
                                        <label for="linkName">name</label>
                                        <input v-model="newLinkName" type="text">
                                        <label for="linkUrl">url</label>
                                        <input v-model="newLinkUrl" type="url" @keyup.enter="addLink()">
                                        <Icon icon="ic:baseline-add-circle" @click="addLink()" />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>File not found</p>
            </div>
        </div>
    </main>
</template>