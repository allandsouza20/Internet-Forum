<template>
<!-- <div class="thread-list">

        <h2 class="list-title">Threads</h2>
        <ThreadListItem 
        v-for="thread in threads" 
        :thread="thread" 
        :key="thread['.key']"
        />
          </div> -->
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <PostList :posts="posts"/>
  </div>
</template>

<script>
// To be able to use a component inside another, you will need to import it to register it.
// import ThreadListItem from '@/components/ThreadListItem'
import sourceData from '@/data'
import PostList from '@/components/PostList'

export default {
    // components option is an object that contains the components
    // This is how we dont need to add the vue suffix when we import files
  components: {
    PostList
  },

  props: {
    // threads: {
    //   required: true,
    //   // The idea is to have a array of threads in the ThreadList component and pass it's threads of array into the ThreadListItem component
    //   type: Array
    // }
    id: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      thread: sourceData.threads[this.id]
    }
  },

  computed: {
    posts () {
      // Create an array with the post id's
      // Object.values converts it to an array
      const postIds = Object.values(this.thread.posts)
      // Since sourceData.posts is an object, we can filter it.
      // .filter(post => postIds.includes(post['.key']))
      // keeps the post whose id's are included in the post id's array
      return Object.values(sourceData.posts).filter(post => postIds.includes(post['.key']))
    }
  }
}
</script>