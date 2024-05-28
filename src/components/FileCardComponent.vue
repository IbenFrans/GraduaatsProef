<script>
import { Icon } from "@iconify/vue"

export default{
    props:[
        "type",
        "icon"
    ],
    components:{
        Icon
    }

}

</script>

<template>
    <div class="fileType">
        <div class="fileType_background">
            <div class="fileType_circleIcon">
                <Icon :icon="icon" />
            </div>
        </div>
        <p>{{ type }}</p>
    </div>
</template>