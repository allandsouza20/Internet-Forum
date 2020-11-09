<template>
  <div class="col-full" 
  :class="$style.centered">   
  <!-- Here, :class="$style.centered" defines a CSS module. CSS modules always make sure that the class names are always unique -->
      <h1 :class="$style.headingLarge">Not found</h1>   <!-- :class is the same as v-bind:class -->
      <p class="text-large" 
      :class="$style.textLarge"
      >
      Ooops, we couldn't find what you are looking for, why don't you 
          <router-link :to="{name: 'Home'}"> 
              go home instead?
          </router-link>
          </p>   <!-- We can even use :class="$style.[heading-large]" if the class is defined in the css rule as .heading-large-->
  </div>
  <!-- Note: The global variable that contains the vue component is always $vm0. this can be access in the browser console -->
</template>

<script>
export default {

}
</script>

<style module>
/* NOTE: class selectors are much faster than element selectors */
  .headingLarge {
    font-size: 100px;
  }
  
  .textLarge {
    font-size: 50px;
    font-weight: 100;
  }

  .centered {
    text-align: center;
  }
</style>