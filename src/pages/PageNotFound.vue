<template>
  <div class="col-full">
      <h1>Not found</h1>
      <p>Ooops, we couldn't find what you are looking for, why don't you 
          <router-link :to="{name: 'Home'}"> 
              go home instead?
          </router-link>
          </p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  h1 {
    font-size: 100px;
  }
  
  p {
    font-size: 50px;
    font-weight: 100;
  }

  div {
    text-align: center;
  }
</style>