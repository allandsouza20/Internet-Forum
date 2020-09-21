<!-- The components directory contains the components of our web page -->
<template>
<div>
<div v-for="thread in threads" class="col-large push-top">    <!-- Since this div goes through a loop, it renders multiple divs although it is a root element. Therefore, we can have another div as the root element -->

          <h1>{{ thread.title }}</h1>



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
    <!-- <div>
      <h1>Welcome to the Forum</h1>
      <div :v-for="thread in threads">
        <h2>{{ thread.title }} </h2>
        <div :v-for="postId in thread.posts">
          <p>{{ users[posts[postId].userId].name }}</p>
          <p>{{ posts[postId].text }}</p>
        </div>
      </div>
    </div> -->
</div>
</template>

<script>
import sourceData from '@/data'     // Here, sourceData is a local variable, more like a file handler. @ will directly refer to the src directory. You can also you ../ to go back a directory to navigate to the json file.
console.log(sourceData)
export default {
  name: 'HelloWorld',
  data () {
    return {
      threads: sourceData.threads,    // Here, threads is a data property
      posts: sourceData.posts,
      users: sourceData.users
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

