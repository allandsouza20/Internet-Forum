<!-- This is the main component. Think of it like a layout of our application -->
<template>
  <div id="app">
    <TheNavBar/>   <!-- The header element should be rendered before the div with the class of container -->
    <div class="container">
      <router-view/>     <!-- This components renders the component of the active route -->
    </div>
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar'
export default {
  components: {
    TheNavBar
  }
}
</script>
<style>
@import "./assets/css/style.css";
/* To import bootstrap css use @import ~/bootstrap/css/bootstrap.css; You can do the same with Sass and Less files */
</style>
