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
            <div>
            {{ post.text }}
            </div>
        </div>



        <div class="post-date text-faded">
            {{ humanFriendlyDate }}
        </div>

        
    </div>
</template>

<script>
// to render a thread, add @sourceData
import sourceData from '@/data'
import moment from 'moment'
// Note: All components must export an object with options by default
// in Vue.js every component instance has it's own isolated scope, this means that you shouldn't reference parent data with it's child component.
// all threads or components must be passed a thread id property to know which thread to show.
export default {
    // props is used to pass data to the child component
    // using a computed property, we can make sure if changes happen in sourceData
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  computed: {
    user () {
      return sourceData.users[this.post.userId]
    },

    userPostCount () {
        // const postIds = this.user.posts;
        // const postIdsArray = Object.keys(posts)
        // return postIdsArray.length
      return Object.keys(this.user.posts).length
    },

    // computed property to transform the timestamp
    // NOTE: computed properties do not accept arguements
    humanFriendlyDate () {
      return moment.unix(this.post.publishedAt).format('MMMM Do YYYY, h:mm:ss a')
    }
  }
}
</script>