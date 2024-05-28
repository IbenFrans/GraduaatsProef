<script>

import { Icon } from "@iconify/vue"

export default{
    data(){
        return{
            searchInput: "",
            iconSet: "ic:",

            navItems:[
                {path: "/", name: "Home", icon: "home"},
                {path: "/BrandGuide", name: "BrandGuide", icon: "baseline-format-paint"},
                {path: "/Recent", name: "Recent", icon: "loop"},
                {path: "/Favourites", name: "Favourites", icon: "star"},
                {path: "/AllFiles", name: "All files", icon: "baseline-arrow-right"}
            ],
            settings: {path: "/Settings", name: "Settings", icon: "settings"},

            account:{
                image: "src/assets/images/MediaKitLogoIcon.png",
                name: "MediaKit Account"
            },
        }
    },
    components:{
        Icon
    }
}
</script>

<template>
    <header>
        <!-- Searchbar -->
        <div class="navBar_searchbar">
        <form action="">
            <input type="text" v-model="searchInput" name="searchbar" id="searchbar" placeholder="Search files" >
        </form>
        </div>

        <!-- Navigation menu -->
        <div class="navBar_navigation">
            <ul class="navBar_navigation_list">
                <li  v-for="navItem in navItems">
                    <router-link :to="navItem.path">
                        <Icon :icon="iconSet + navItem.icon" width="1rem" height="1rem"/>
                        {{ navItem.name }}
                    </router-link>
                </li>
            </ul>
            <div>
                <router-link :to="settings.path" class="navBar_navigation_settings">
                    <Icon :icon="iconSet + settings.icon" width="1rem" height="1rem"/>
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