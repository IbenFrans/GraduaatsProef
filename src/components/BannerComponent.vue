<script>
export default{
    props: [
        "title"
    ]
}
</script>

<template>
    <div class="banner">
        <img src="@/assets/MediaKitLogo.png" alt="" class="logo">
        <div>
            <h1 v-if="title">{{ title }}</h1>
            <div v-else class="banner_buttons">
                <button>Add Folder</button>
                <button>Add File</button>
            </div>
        </div>
    </div>
</template>