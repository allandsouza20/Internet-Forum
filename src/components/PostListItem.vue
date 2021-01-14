<template>


    <div class="post">

        <div class="user-info">
            <a href="#" class="user-name">{{ user.name }}</a>

            <a href="#">
                <img class="avatar-large" v-bind:src="user.avatar" alt="">
            </a>

            <p class="desktop-only text-small">{{ userPostCount }} posts</p>

        </div>

        <div class="post-content">
            <div v-if="!editing">
              {{ post.text }}
            </div>
            <div v-else>
              <PostEditor
              :post="post"
              @save="editing = false"
              />
            </div>
        </div>



        <div class="post-date text-faded">
          <!-- The timestamp that we want to display here is post.publishedAt -->
          <AppDate :timestamp="post.publishedAt"/>
        </div>


    </div>
</template>

<script>
// to render a thread, add @this.$store.state

// Note: All components must export an object with options by default
// in Vue.js every component instance has it's own isolated scope, this means that you shouldn't reference parent data with it's child component.
// all threads or components must be passed a thread id property to know which thread to show.
import {countObjectProperties} from '../utils'
import PostEditor from './PostEditor'
export default {
    // props is used to pass data to the child component
    // using a computed property, we can make sure if changes happen in this.$store.state

  props: {
    post: {
      required: true,
      type: Object
    }
  },
  components: {
    PostEditor
  },

  data () {
    return {
      editing: false
    }
  },
  computed: {
    user () {
      return this.$store.state.users[this.post.userId]
    },

    userPostCount () {
        // const postIds = this.user.posts;
        // const postIdsArray = Object.keys(posts)
        // return postIdsArray.length
      // return Object.keys(this.user.posts).length
      return countObjectProperties(this.user.posts)
    }
  }
}
</script>
