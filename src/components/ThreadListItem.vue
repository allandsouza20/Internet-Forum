<template>
  <div class="thread">
    <div>
      <p>
        <!-- <a :href="`/thread/${thread['.key']}`"></a>    Here, we are linking the contents of the thread with the title, so that whenever a user clicks on a thread, he / she is directed to the contents of the thread -->
        <!-- Here, a directs us to the specific thread but it reloads the page. To avoid this, we can use the router-link component -->
        <router-link :to="{name: 'ThreadShow', params: {id: thread['.key']}}">  <!-- router-link renders an anchor by default, You can also specify `/thread/${thread['.key']}`, but using this will not allow us to change the path in the router, i.e. index.js-->
          {{ thread.title }}
        </router-link>  <!-- to can be a path or it can be a state of an object -->
      </p>
      <p class="text-faded text-xsmall">
        By <a href="#">{{ user.name }}</a>, {{ thread.publishedAt }}
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">
        {{ repliesCount }} replies  <!-- The number of replies are taken as the number of posts the user has -1 -->
      </p>

      <!-- <img class="avatar-medium" src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png" alt=""> -->

        <!-- This div contains information about the last reply or the last post -->
      <!-- <div>
          <p class="text-xsmall">
              <a href="#">Bruce Wayne</a>
          </p>
          <p class="text-xsmall text-faded">2 hours ago</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import sourceData from '@/data'
export default {
  props: {
    thread: {
      required: true,
      type: Object
    }
  },
  computed: {
    repliesCount () {
      return Object.keys(this.thread.posts).length - 1
    },
    user () {
      return sourceData.users[this.thread.userId]
    }
  }
}
</script>
