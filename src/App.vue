<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFoot"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {reqFoodType} from './api'
export default {
  async mounted() {
    const result = await reqFoodType()
    console.log(result)

  },
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" scoped>
</style>