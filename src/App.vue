<!-- This is the main component. Think of it like a layout of our application -->
<template>
  <div id="app">
    <TheNavBar/>   <!-- The header element should be rendered before the div with the class of container -->
    <div class="container">
      <router-view v-show="showPage" @ready="pageReady"/>     <!-- This components renders the component of the active route -->
      <AppSpinner v-show="!showPage"/>
    </div>
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar'
import AppSpinner from './components/AppSpinner'
import NProgress from 'nprogress'
export default {
  components: {
    TheNavBar,
    AppSpinner
  },

  data () {
    return {
      showPage: false
    }
  },

  methods: {
    pageReady () {
      this.showPage = true
      NProgress.done()
    }
  },

  created () {
    NProgress.configure({
      speed: 200,
      showSpinner: false
    })
    NProgress.start()
    // to - route object we are navigating to
    // from - current router from where we navigate our way
    // next - function we have to call in order to resolve the hook
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false
      NProgress.start()
      next()    // next() is used to navigate to the callback
    })
  }
}
</script>
<style>
@import "./assets/css/style.css";
/* ~ is used to point to the node_modules directory */
@import "~nprogress/nprogress.css";
/* To import bootstrap css use @import ~/bootstrap/css/bootstrap.css; You can do the same with Sass and Less files */
#nprogress .bar {
  background: #57ad8d;
}
</style>
