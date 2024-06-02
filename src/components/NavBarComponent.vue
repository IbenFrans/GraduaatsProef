<script>
import { Icon } from "@iconify/vue"
import { useFirebaseStore } from "@/stores/firebaseStore.js"
import { ref } from 'vue'

export default {
    data() {
        return {
            firebaseStore: useFirebaseStore(),

            searchInput: "",
            files: [],
            filteredFiles: [],

            iconSet: "ic:",

            navItems: [
                { path: "/", name: "Home", icon: "home" },
                { path: "/BrandGuide", name: "BrandGuide", icon: "baseline-format-paint" },
                { path: "/Recent", name: "Recent", icon: "loop" },
                { path: "/Favourites", name: "Favourites", icon: "star" },
                { path: "/Files/All", name: "All files", icon: "baseline-arrow-right" }
            ],
            settings: { path: "/Settings", name: "Settings", icon: "settings" },

            account: {
                image: "src/assets/images/MediaKitLogoIcon.png",
                name: "MediaKit Account"
            },
        }
    },
    components: {
        Icon
    },
    computed: {
        filteredList() {
            if (this.searchInput) {
                this.filteredFiles = this.files.filter(file =>
                    file.name.toLowerCase().includes(this.searchInput.toLowerCase()))
            } else {
                this.filteredFiles = []
            }
        },
    },
    methods: {
        async fetchFiles() {
            await this.firebaseStore.fetchFiles()
            this.files = this.firebaseStore.files
        },
        dynamicName(name) {
            if (name && name.length > 25) {
                return name.substr(0, 10) + "..." + name.substr(name.length - 10, name.length)
            } else {
                return name
            }
        },
    },
    created() {
        this.fetchFiles()
        this.filteredList
    }
}
</script>

<template>
    <header>
        <!-- Searchbar -->
        <p>{{ this.filteredList }}</p>
        <div class="navBar_searchbar">
            <form action="">
                <div class="searchItem" v-for="item in this.filteredFiles.slice(0, 3)" :key="item.name" @click="this.searchInput=''">
                    <router-link :to="'/Files/Detail/' + item.name">
                        <p>{{ this.dynamicName(item.name) }}</p>
                    </router-link>
                </div>
                <input type="text" v-model="searchInput" name="searchbar" id="searchbar" placeholder="Search files">
            </form>
        </div>

        <!-- Navigation menu -->
        <div class="navBar_navigation">
            <ul class="navBar_navigation_list">
                <li v-for="navItem in navItems">
                    <router-link :to="navItem.path">
                        <Icon :icon="iconSet + navItem.icon" width="1rem" height="1rem" />
                        {{ navItem.name }}
                    </router-link>
                </li>
            </ul>
            <div>
                <router-link :to="settings.path" class="navBar_navigation_settings">
                    <Icon :icon="iconSet + settings.icon" width="1rem" height="1rem" />
                    {{ settings.name }}
                </router-link>
            </div>
        </div>

        <!-- Account -->
        <div class="navBar_account">
            <img src="@/assets/MediaKitLogoIcon.png" alt="accountPicture">
            <div class="navBar_account_nameLogout">
                <h3>{{ account.name }}</h3>
                <p class="navBar_account_nameLogout_button">Logout</p>
            </div>
        </div>
    </header>
</template>