<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <p>
      By <a href="#" class="link-unstyled">Robin</a>, <AppDate :timestamp="thread.publishedAt"/>.
      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">3 replies by 3 contributors</span>
    </p>
    <PostList :posts="posts"/>
    <PostEditor
    :threadId="id"
    />
  </div>
</template>

<script>
// To be able to use a component inside another, you will need to import it to register it.
// import ThreadListItem from '@/components/ThreadListItem'

import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'

export default {
  // components option is an object that contains the components
  // This is how we dont need to add the vue suffix when we import files
  components: {
    PostList,
    PostEditor
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

  computed: {
    thread () {
      // To make the form work, we can bind text-areas value to a data property, and invoke a method when the form is submitted
      return this.$store.state.threads[this.id]
    },
    posts () {
      // Create an array with the post id's
      // Object.values converts it to an array
      const postIds = Object.values(this.thread.posts)
      // Since sourceData.posts is an object, we can filter it.
      // .filter(post => postIds.includes(post['.key']))
      // keeps the post whose id's are included in the post id's array
      return Object.values(this.$store.state.posts).filter(post => postIds.includes(post['.key']))
    }
  }
  // state: used to describe all the data around our application
  // In Vue.js, the methods are functions with access to the component instance
}
</script>

