<!-- The components directory contains the components of our web page -->
<template>
  <div class="col-full push-top">
    <h1>Welcome to the forum</h1>
    <CategoryList :categories="categories"/>    <!-- NOTE: The component template needs to be wrapped in one root element, in this case, div -->
  </div>
</template>

<script>
//      // Here, sourceData is a local variable, more like a file handler. @ will directly refer to the src directory. You can also you ../ to go back a directory to navigate to the json file.
import CategoryList from '@/components/CategoryList'
// console.log(sourceData)
export default {

  components: {
    CategoryList
  },

  computed: {
    categories () {
      return Object.values(this.$store.state.categories)
    }
  },

  beforeCreate () {
    console.log('beforeCreate', this.categories)
  },

  created () {
    console.log('created', this.categories)
  },

  beforeMount () {
    console.log('beforeMount', this.categories)
  },

  mounted () {
    console.log('mounted', this.categories, this.$el.innerText)
  },

  beforeDestroy () {
    console.log('beforeDestroy - turn off listeners', this.categories)
  },

  destroyed () {
    console.log('destroyed', this.categories)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
