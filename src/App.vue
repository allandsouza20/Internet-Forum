<!-- This is the main component. Think of it like a layout of our application -->
<template>
  <div id="app">
    <TheNavBar/>   <!-- The header element should be rendered before the div with the class of container -->
    <div class="container">
      <router-view v-show="showPage" @ready="showPage = true"/>     <!-- This components renders the component of the active route -->
      <div v-show="!showPage">loading...</div>
    </div>
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar'
export default {
  components: {
    TheNavBar
  },

  data () {
    return {
      showPage: false
    }
  },

  created () {
    // to - route object we are navigating to
    // from - current router from where we navigate our way
    // next - function we have to call in order to resolve the hook
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false
      next()    // next() is used to navigate to the callback
    })
  }
}
</script>
<style>
@import "./assets/css/style.css";
/* To import bootstrap css use @import ~/bootstrap/css/bootstrap.css; You can do the same with Sass and Less files */
</style>
