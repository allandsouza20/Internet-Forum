<!-- This is the main component. Think of it like a layout of our application -->
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="container">
      <router-view/>     <!-- This components renders the component of the active route -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
  // const name='Allan'
<style>
@import "./assets/css/style.css";
/* To import bootstrap css use @import ~/bootstrap/css/bootstrap.css; You can do the same with Sass and Less files */
</style>
