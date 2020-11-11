<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <PostList :posts="posts"/>
    <form v-on:submit.prevent="addPost">   <!-- .prevent prevents the page from reloading -->
      <div class="form-group">
        <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        class="form-input"
        v-model="newPostText"
        >  <!-- $event.target.value means that if the value of newPostText changes, then the textarea changes as well. If the content of the textarea changes, then newPostText will change as well.
        v-bind:value="newPostText"
        @input="newPostText = $event.target.value". This is called as two way binding. We can also use the v-model directive. -->
        </textarea>    <!-- The value held by the textarea is bound to the data property newPostText using v-bind-->
      <!-- The idea here is to update newPostText every time the user types something -->
      <!-- v-on is used to listen to a native or a custom event, We can also use @ instead of v-on -->
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>
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
      // To make the form work, we can bind text-areas value to a data property, and invoke a method when the form is submitted
      thread: sourceData.threads[this.id],
      newPostText: ''
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
    addPost () {
      const postId = 'greatPost' + Math.random()   // we are generating an id since newPost does not have an id
      //  threadId and the userId properties are foreign keys that connect the posts with the related resources.
      // since we won't use the post keyword later on, we can use the const keyword to declare it. This means that we cannot assign values to the variable post again but change it's contents.
      const post = {
        text: this.newPostText,
        // Date.now() can be used to get the current timestamp. it returns the timestamp in milliseconds.
        // to get it in seconds, we can divide it by 1000
        // Math.floor returns the largest integer that is less than or equal to the given number
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.id,
        userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
        // since we can't use . in the property name, we will have to wrap it in quotes
        '.key': postId
      }
      // we can access the post object using sourceData.posts
      this.$set(sourceData.posts, postId, post)    // Vue.set is used to make the changes reactive
      // to use Vue set, we'll have to import Vue, instead of this, we can use the instance alias, i.e. this.$set
      // parameters are object, propertyName, value
      this.$set(this.thread.posts, postId, postId)
      // append the new post ID to the users posts object that contains the id's of the post that the user has written
      this.$set(sourceData.users[post.userId].posts, postId, postId)
      // to clean up the textarea after the post is submitted
      this.newPostText = ''   // this will be reflected in the textarea since we have bound it using two way binding using v-model
    }
  }
}
</script>

