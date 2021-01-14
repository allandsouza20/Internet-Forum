<template>
  <div class="flex-grid">
    <UserProfileCard
      v-if="!edit"
      :user="user"
      :userPostsCount="userPostsCount"
      :userThreadCount="userThreadsCount"
    />
    <UserProfileCardEditor
      v-else
      :user="user"
      :userPostsCount="userPostsCount"
      :userThreadCount="userThreadsCount"
    />
    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">
            Joker's recent activity
        </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr>
      <PostList :posts="userPosts"/>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'
import {mapGetters} from 'vuex'
import {countObjectProperties} from '@/utils'

export default {
  name: 'PageProfile',
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },

  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters(({
      user: 'authUser'    // map the local user property to the authUser getter
    })),

    userThreadsCount () {
      return countObjectProperties(this.user.threads)
      // return this.user.threads ? Object.keys(this.user.threads).length : 0
    },

    userPostsCount () {
      return countObjectProperties(this.user.posts)
      // return this.user.posts ? Object.keys(this.user.posts).length : 0
    },

    userPosts () {
      // if the user has any posts, find it in the state
      if (this.user.posts) {
        // compare the posts object to an array and use the filter method to get the posts whose userId attribute is equal to our users key
        return Object.values(this.$store.state.posts)
        .filter(post => post.userId === this.user['.key'])
      }
    //  if the user does not have any posts, return an empty array
      return []
    }
  }
}
</script>

<style scoped>

</style>
