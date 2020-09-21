<template>
    <div class="col-large push-top">    <!-- Since this div goes through a loop, it renders multiple divs although it is a root element. Therefore, we can have another div as the root element -->

          <!-- <h1>{{ thread.title }}</h1> -->



          <div class="post-list">

              <div v-for="postId in thread.posts" class="post">

                  <div class="user-info">
                      <a href="#" class="user-name">{{ users[posts[postId].userId].name }}</a>

                      <a href="#">
                          <img class="avatar-large" v-bind:src="users[posts[postId].userId].avatar" alt="">
                      </a>

                      <p class="desktop-only text-small">107 posts</p>

                  </div>

                  <div class="post-content">
                      <div>
                        {{ posts[postId].text }}
                      </div>
                  </div>



                  <div class="post-date text-faded">
                      {{ posts[postId].publishedAt }}
                  </div>

                  
              </div>

              
              
          </div>
      </div>
</template>

<script>
// to render a thread, add @sourceData
import sourceData from '@/data'
// Note: All components must export an object with options by default
// in Vue.js every component instance has it's own isolated scope, this means that you shouldn't reference parent data with it's child component.
// all threads or components must be passed a thread id property to know which thread to show.
export default {
    // props is used to pass data to the child component
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data () {
    return {
        // threads always live under sourceData.threads[]
        // we can also use this.$route.params.id, but this is not ideal, since the route is tightly coupled to the component
      thread: sourceData.threads[this.id],
      posts: sourceData.posts,
      users: sourceData.users
    }
  }
}
</script>