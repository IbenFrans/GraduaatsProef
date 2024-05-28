<script>
import NavBarComponent from '@/components/NavBarComponent.vue'
import { Icon } from "@iconify/vue"

export default{
  data(){
    return{

    }
  },
  components:{
    NavBarComponent,
    Icon
  }

}
</script>

<template>
  <div class="mainHeader">
    <NavBarComponent/>
    <RouterView />
  </div>
</template>

<style>

</style>
