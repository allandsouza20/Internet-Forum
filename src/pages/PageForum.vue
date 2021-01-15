<template>
  <div v-if="forum" class="forum-wrapper">
    <div class="col-full push-top">


      <div class="forum-header">
        <div class="forum-details">
          <h1>{{forum.name}}</h1>
          <p class="text-lead">{{forum.description}}</p>
        </div>
        <router-link
        :to="{name: 'ThreadCreate', params: {forumId: this.forum['.key']}}"
        class="btn-green btn-small">
          Start a thread
        </router-link>
      </div>
    </div>

    <div class="col-full push-top">
      <ThreadList :threads="threads" />
    </div>

  </div>
</template>

<script>
import ThreadList from '@/components/ThreadList'

export default {
  components: {
    ThreadList
  },

  props: {
    // This is the id property that is coming from the route
    id: {
      required: true,
      type: String
    }
  },

  computed: {
    // We are including forum () and threads () as computed properties since they
    // will be revaluated everytime thier dependencies change.
    // if we keep them in the daata object, there is a drawback
    // i.e. they will be evaluated only once. Thus if a user creates a new thread, it won't show up.

    forum () {
      return this.$store.state.forums[this.id]
    },

    threads () {
      // Object.values is used to typecast the object to an array
      return Object.values(this.$store.state.threads)
      .filter(thread => thread.forumId === this.id)
    }
  },

  created () {
    this.$store.dispatch('fetchForum', {id: this.id})
    .then(forum => {
      this.$store.dispatch('fetchThreads', {ids: forum.threads})
      .then(threads => {
        threads.forEach(thread => this.$store.dispatch('fetchUser', {id: thread.userId}))
      })
    })
  }
}
</script>

<style scoped>
  .forum-wrapper {
    width: 100%;
  }
</style>
