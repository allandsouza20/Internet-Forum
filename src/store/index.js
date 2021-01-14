import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'

// install the vuex plugin in the application
Vue.use(Vuex)

// export the Vuex store
export default new Vuex.Store({
  state: {
    // ... is called a spread operator
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'    // authId is used to grab the authenticated user from the state
  },

  getters: {
    // a getter can be used anywhere in our application
    authUser (state) {
      return state.users[state.authId]
    }
  },

  actions: {
    createPost (context, post) {
      const postId = 'greatPost' + Math.random()   // we are generating an id since newPost does not have an id
      post['.key'] = postId
      context.commit('setPost', {post, postId})
      context.commit('appendPostToThread', {threadId: post.threadId, postId})
      context.commit('appendPostToUser', {userId: post.userId, postId})
    },

    // the only job of this action is to commit the setUser mutation
    updateUser ({commit}, user) {
      // the payload here is the userId that we can access under the key property of the user object
      commit('setUser', {userId: user['.key'], user})
    }
  },

  mutations: {
    // all mutations accept state as the first argument
    // Syntax of Vue.set(objectToAddNewProperty, propertyName, propertyValue)
    setPost (state, {post, postId}) {
      // we can access the post object using sourceData.posts.
      // Each Vue.set is an individual state change. We use Vue.set to add or delete object properties
      // set post
      Vue.set(state.posts, postId, post)    // Vue.set is used to make the changes reactive
    },

    setUser (state, {user, userId}) {
      Vue.set(state.users, userId, user)
    },

    appendPostToThread (state, {postId, threadId}) {
      const thread = state.threads[threadId]
      // to use Vue set, we'll have to import Vue, instead of this, we can use the instance alias, i.e. this.$set
      // parameters are object, propertyName, value
      // append post to thread
      Vue.set(thread.posts, postId, postId)
    },

    appendPostToUser (state, {postId, userId}) {
      const user = state.users[userId]
      // append the new post ID to the users posts object that contains the id's of the post that the user has written
      // append post to user
      Vue.set(user.posts, postId, postId)
    }
  }
})
