<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFoot"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  mounted() {
    //this.$store.dispatch('getAddress')
    this.getAddress()
  },
  methods: {
    ...mapActions(['getAddress'])
  },
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" scoped>
</style>