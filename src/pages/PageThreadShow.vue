<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <p>
      By <a href="#" class="link-unstyled">Robin</a>, <AppDate :timestamp="thread.publishedAt"/>.
      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">3 replies by 3 contributors</span>
    </p>
    <PostList :posts="posts"/>
    <PostEditor
    @save="addPost"
    :threadId="id"
    />
  </div>
</template>

<script>
// To be able to use a component inside another, you will need to import it to register it.
// import ThreadListItem from '@/components/ThreadListItem'
import sourceData from '@/data'
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

  data () {
    return {
      // To make the form work, we can bind text-areas value to a data property, and invoke a method when the form is submitted
      thread: sourceData.threads[this.id]
      // newPostText: ''
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
  },
  // state: used to describe all the data around our application
  // In Vue.js, the methods are functions with access to the component instance
  methods: {
    addPost ({post}) {
      // Here, {post} is a destructuring assignment
      // console.log(eventData)
      // const post = eventData.post   // we can grab the post from the eventData object
      const postId = post['.key']
      // we can access the post object using sourceData.posts
      this.$set(sourceData.posts, postId, post)    // Vue.set is used to make the changes reactive
      // to use Vue set, we'll have to import Vue, instead of this, we can use the instance alias, i.e. this.$set
      // parameters are object, propertyName, value
      this.$set(this.thread.posts, postId, postId)
      // append the new post ID to the users posts object that contains the id's of the post that the user has written
      this.$set(sourceData.users[post.userId].posts, postId, postId)
    }
  }
}
</script>

