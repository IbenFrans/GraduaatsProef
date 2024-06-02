<script>
import Banner from "@/components/BannerComponent.vue"
import { Icon } from "@iconify/vue"
import { useFirebaseStore } from "@/stores/firebaseStore.js"

export default {
    data() {
        return {
            firebaseStore: useFirebaseStore(),
            title: "BrandGuide",
            brandGuidePdf: { name: "Brandguidelines.pdf", url: "url" },
            logos: [],
            fonts: [],
            Icons: [],
        }
    },
    components: {
        Banner,
        Icon,
    },
    methods: {
        downloadPDF() {

        },
        uploadPDF() {

        },
        deletePDF() {

        }
    },
    computed: {
        async getBranding(){
            try{
                console.log(this.firebaseStore.getFilesLocation("/Branding/Logo"))
                return this.firebaseStore.getFilesLocation("/Branding/Logo")
            } catch (error){
                console.log(error)
            }
        },
    },
    created(){
        this.logos = this.getBranding
        console.log(this.logos)
    }
}
</script>

<template>
    <main>
        <Banner :title="this.title" />
        <p v-for="item in this.logos">{{ item.name }}</p>

        <!-- Brandguide -->
        <h2 class="h2Title sectionTitle">Brand Guidelines</h2>
        <section class="brandguideSection">
            <a v-if="brandGuidePdf" :href="brandGuidePdf.url">{{ brandGuidePdf.name }}</a>
            <p v-else>Add a brandguide</p>
            <div class="icons">
                <Icon v-if="brandGuidePdf" icon="ic:baseline-download" />
                <Icon v-if="brandGuidePdf" icon="ic:baseline-delete" />
                <Icon v-else icon="ic:baseline-add-circle" />
            </div>
        </section>

        <!-- Logo -->
        <h2 class="h2Title sectionTitle">Logo</h2>
        <section class="brandguideSection">
            <ul class="logoList">
                <li>
                    <div class="logoData">
                        <p>Logo Regular</p>
                        <p>22 MB</p>
                        <p>SVG</p>
                        <div class="icons">
                            <Icon v-if="brandGuidePdf" icon="ic:baseline-download" />
                            <Icon v-if="brandGuidePdf" icon="ic:baseline-delete" />
                            <Icon v-else icon="ic:baseline-add-circle" />
                        </div>
                    </div>
                    <img src="../assets/MediaKitLogo.png" alt="">
                </li>
                <li>
                    <div class="logoData">
                        <p>Logo Regular</p>
                        <p>22 MB</p>
                        <p>SVG</p>
                        <div class="icons">
                            <Icon v-if="brandGuidePdf" icon="ic:baseline-download" />
                            <Icon v-if="brandGuidePdf" icon="ic:baseline-delete" />
                            <Icon v-else icon="ic:baseline-add-circle" />
                        </div>
                    </div>
                    <img src="../assets/MediaKitLogo.png" alt="">
                </li>
            </ul>
        </section>

        <!-- Colors -->
        <h2 class="h2Title sectionTitle">Colors</h2>
        <section class="brandguideSection">
            <div class="colorList">
                <div class="colorItem">
                    <div class="color" style="background-color: red" />
                    <div class="colorDetail">
                        <h3>Primary</h3>
                        <p>#64AFC6</p>
                        <p>CYMK</p>
                        <p>RGB</p>
                    </div>
                    <div class="icons">
                            <Icon v-if="brandGuidePdf" icon="ic:baseline-download" />
                            <Icon v-if="brandGuidePdf" icon="ic:baseline-delete" />
                            <Icon v-else icon="ic:baseline-add-circle" />
                    </div>
                </div>
                <div class="colorItem">
                    <div class="color" style="background-color: red" />
                    <div class="colorDetail">
                        <h3>Primary</h3>
                        <p>#64AFC6</p>
                        <p>CYMK</p>
                        <p>RGB</p>
                    </div>
                    <div class="icons">
                            <Icon v-if="brandGuidePdf" icon="ic:baseline-download" />
                            <Icon v-if="brandGuidePdf" icon="ic:baseline-delete" />
                            <Icon v-else icon="ic:baseline-add-circle" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Fonts -->
        <h2 class="h2Title sectionTitle">Fonts</h2>
        <section class="brandguideSection">
            <a v-if="brandGuidePdf" :href="brandGuidePdf.url">{{ brandGuidePdf.name }}</a>
            <p v-else>Add a font</p>
            <div class="icons">
                <Icon v-if="brandGuidePdf" icon="ic:baseline-download" />
                <Icon v-if="brandGuidePdf" icon="ic:baseline-delete" />
                <Icon v-else icon="ic:baseline-add-circle" />
            </div>
        </section>

        <!-- Icons -->
        <h2 class="h2Title sectionTitle">Icons</h2>
        <section class="brandguideSection">
            <a v-if="brandGuidePdf" :href="brandGuidePdf.url">{{ brandGuidePdf.name }}</a>
            <p v-else>Add a font</p>
            <div class="icons">
                <Icon v-if="brandGuidePdf" icon="ic:baseline-download" />
                <Icon v-if="brandGuidePdf" icon="ic:baseline-delete" />
                <Icon v-else icon="ic:baseline-add-circle" />
            </div>
        </section>
    </main>
</template>