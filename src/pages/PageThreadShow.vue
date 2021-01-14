<template>
  <div v-if="thread && user" class="col-large push-top">
    <h1>{{ thread.title }}
<!--      using the tag option, we can decide the element that we want to render -->
    <router-link
      :to="{name: 'ThreadEdit', id: this.id}"
      class="btn-green btn-small"
      tag="button"
    >
      Edit Thread
    </router-link>
    </h1>
    <p>
      By <a href="#" class="link-unstyled">{{ user.name }}</a>, <AppDate :timestamp="thread.publishedAt"/>.
      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{ repliesCount }} replies by {{ contributorsCount }} contributors</span>
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
import firebase from 'firebase'
import PostList from '../components/PostList'
import PostEditor from '../components/PostEditor'
import {countObjectProperties} from '../utils'

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

    repliesCount () {
      // return Object.keys(this.thread.posts).length - 1
      return this.$store.getters.threadRepliesCount(this.thread['.key'])
    },

    user () {
      return this.$store.state.users[this.thread.userId]
    },

    contributorsCount () {
      return countObjectProperties(this.thread.contributors)
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
  },

  created () {
    // fetch thread
    firebase.database().ref('threads').child(this.id).once('value', snapshot => {
      const thread = snapshot.val()
      this.$store.commit('setThread', {threadId: snapshot.key, thread: {...thread, '.key': snapshot.key}})

      // fetch user
      firebase.database().ref('users').child(thread.userId).once('value', snapshot => {
        const user = snapshot.val()
        this.$store.commit('setUser', {userId: snapshot.key, user: {...user, '.key': snapshot.key}})
      })

      Object.keys(thread.posts).forEach(postId => {
        // fetch post
        firebase.database().ref('posts').child(postId).once('value', snapshot => {
          const post = snapshot.val()
          this.$store.commit('setPost', {postId: snapshot.key, post: {...post, '.key': snapshot.key}})
          // fetch user
          firebase.database().ref('users').child(post.userId).once('value', snapshot => {
            const user = snapshot.val()
            this.$store.commit('setUser', {userId: snapshot.key, user: {...user, '.key': snapshot.key}})
          })
        })
      })
    })
  }
  // state: used to describe all the data around our application
  // In Vue.js, the methods are functions with access to the component instance
}
</script>

