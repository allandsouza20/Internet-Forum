<!-- The components directory contains the components of our web page -->
<template>
  <div class="col-full">
    <h1>Welcome to the forum</h1>
    <CategoryList :categories="categories"/>    <!-- NOTE: The component template needs to be wrapped in one root element, in this case, div -->
  </div>
</template>
  
<script>
import sourceData from '@/data'     // Here, sourceData is a local variable, more like a file handler. @ will directly refer to the src directory. You can also you ../ to go back a directory to navigate to the json file.
import CategoryList from '@/components/CategoryList'
console.log(sourceData)
export default {

  components: {
    CategoryList
  },

  data () {
    return {
      // Here, Object.values gets the value pairs of threads in the json file under the key threads. Object.keys gets the key value of the threads in the json file
      // NOTE: All browsers do not support Object.values or Object.keys, but
      // we can fix this by adding the plugin "plugins": ["transform-runtime"] in the babelrc file, since we are using the webpack template
      categories: Object.values(sourceData.categories)    // Here, threads is a data property
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->