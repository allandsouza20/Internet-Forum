<template>
<div class="thread-list">

        <h2 class="list-title">Threads</h2>
        <ThreadListItem 
        v-for="thread in threads" 
        :thread="thread" 
        :key="thread['.key']"
        />
          </div>
</template>

<script>
// To be able to use a component inside another, you will need to import it to register it.
import ThreadListItem from './ThreadListItem'

export default {
    // components option is an object that contains the components
    // This is how we dont need to add the vue suffix when we import files
  components: {
    ThreadListItem
  },

  props: {
    threads: {
      required: true,
      // The idea is to have a array of threads in the ThreadList component and pass it's threads of array into the ThreadListItem component
      type: Array
    }
  }
}
</script>