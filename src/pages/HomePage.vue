<!-- The components directory contains the components of our web page -->
<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Welcome to the forum</h1>
    <CategoryList :categories="categories"/>    <!-- NOTE: The component template needs to be wrapped in one root element, in this case, div -->
  </div>
</template>

<script>
//      // Here, sourceData is a local variable, more like a file handler. @ will directly refer to the src directory. You can also you ../ to go back a directory to navigate to the json file.
import CategoryList from '@/components/CategoryList'
import {mapActions} from 'vuex'
import asyncDataStatus from '../mixins/asyncDataStatus'
// console.log(sourceData)
export default {

  components: {
    CategoryList
  },

  mixins: [asyncDataStatus],

  computed: {
    categories () {
      return Object.values(this.$store.state.categories)
    }
  },

  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])
  },

  created () {
    this.fetchAllCategories()
    .then(categories => Promise.all(categories.map(category => this.fetchForums({ids: Object.keys(category.forums)}))))
      .then(() => {
      //  whatever call we place in here will run after all the actions are complete
        this.asyncDataStatus_fetched()
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
