
<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
      class="text-xlarge"
      :to="{name: 'Forum', params: {id: forum['.key']}}"
      >
      {{forum.name}}
      </router-link>
      <p>{{forum.description}}</p>
    </div>

    <div class="threads-count">
      <p class="count">{{threadCount}}</p>
      <!-- Ternary operator -->
      <!-- If there is one thread, return the word thread, or else return the word threads -->
      {{threadCount == 1 ? 'thread' : 'threads'}}
    </div>

    <div class="last-thread">
      <!-- TODO: implement later -->
    </div>
  </div>
</template>

<script>
import {countObjectProperties} from '@/utils'

export default {
  props: {
    forum: {
      required: true,
      type: Object
    }
  },

  computed: {
    // this property is used to get the thread count
    // it returns the length of the forum threads attribute
    threadCount () {
      return countObjectProperties(this.forum.threads)
      // convert the forum.threads attribute to an array
      // Ternary operator to check if the forum threads property exists otherwise return 0
      // return this.forum.threads
      // ? Object.values(this.forum.threads).length
      // : 0
    }
  }
}
</script>
