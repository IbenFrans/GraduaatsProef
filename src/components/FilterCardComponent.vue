<script>
import { Icon } from "@iconify/vue"

export default {
    props: [
        "icon",
        "type",
        "color",
    ],
    components: {
        Icon
    },
    computed: {
        lighterColor() {
            return this.color + "25"
        },
        getRouterLink(){
            if (this.type === "BrandGuide"){
                return "/BrandGuide"
            } else {
               return "/Files/" + this.type 
            }
        }
    }
}
</script>

<template>
    <router-link :to="getRouterLink">
        <div class="fileType">
            <div class="fileType_background" :style="{ 'background-color': lighterColor }">
                <div class="fileType_circleIcon" :style="{ 'background-color': color }">
                    <Icon :icon="icon" />
                </div>
            </div>
            <p>{{ type }}</p>
        </div>
    </router-link>
</template>