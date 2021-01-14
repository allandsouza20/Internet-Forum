import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'
import {countObjectProperties} from '../utils'

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
    },

  //  getters used to return the count of the users posts and the thread count
    usersThreadsCount: state => id => countObjectProperties(state.users[id].threads),
    usersPostsCount: state => id => countObjectProperties(state.users[id].posts)
  },

  actions: {
    createPost ({commit, state}, post) {
      const postId = 'greatPost' + Math.random()   // we are generating an id since newPost does not have an id
      post['.key'] = postId
      post.userId = state.authId
      // Date.now() can be used to get the current timestamp. it returns the timestamp in milliseconds.
      // to get it in seconds, we can divide it by 1000
      // Math.floor returns the largest integer that is less than or equal to the given number
      post.publishedAt = Math.floor(Date.now() / 1000)
      commit('setPost', {post, postId})
      commit('appendPostToThread', {threadId: post.threadId, postId})
      commit('appendPostToUser', {userId: post.userId, postId})

      return Promise.resolve(state.posts[postId])
    },

    createThread ({state, commit, dispatch}, {text, title, forumId}) {
      return new Promise((resolve, reject) => {
        const threadId = 'greatThread' + Math.random()
        const userId = state.authId
        // Date.now() can be used to get the current timestamp. it returns the timestamp in milliseconds.
        // to get it in seconds, we can divide it by 1000
        // Math.floor returns the largest integer that is less than or equal to the given number
        const publishedAt = Math.floor(Date.now() / 1000)
        const thread = {'.key': threadId, title, forumId, publishedAt, userId}

        commit('setThread', {threadId, thread})
        commit('appendThreadToForum', {forumId, threadId})
        commit('appendThreadToUser', {userId, threadId})

        dispatch('createPost', {text, threadId})
          .then(post => {
            commit('setThread', {threadId, thread: {...thread, firstPostId: post['.key']}})
          })
        resolve(state.threads[threadId])
      })
    },

    updateThread ({state, commit, dispatch}, {title, text, id}) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]
        // const post = state.posts[thread.firstPostId]

        const newThread = {...thread, title}
        // const newPost = {...post, text}

        commit('setThread', {thread: newThread, threadId: id})
        // commit('setPost', {post: newPost, postId: thread.firstPostId})

        // NOTE: The dispatch function is used to call an action
        dispatch('updatePost', {id: thread.firstPostId, text})
          .then(() => {
            // wait for the update post to complete and then resolve the promise
            resolve(newThread)
          })
      })
    },

    updatePost ({state, commit}, {id, text}) {
      return new Promise((resolve, reject) => {
      //   find the post of the state using it's id
        const post = state.posts[id]
        commit('setPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId
            }
          }
        })
        resolve(post)
      })
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

    setThread (state, {thread, threadId}) {
      Vue.set(state.threads, threadId, thread)
    },

    appendPostToThread (state, {postId, threadId}) {
      const thread = state.threads[threadId]
      // check if the forum already has a post property
      if (!thread.posts) {
        // set the post property
        Vue.set(thread, 'posts', {})
      }
      // to use Vue set, we'll have to import Vue, instead of this, we can use the instance alias, i.e. this.$set
      // parameters are object, propertyName, value
      // append post to forum
      Vue.set(thread.posts, postId, postId)
    },

    appendPostToUser (state, {postId, userId}) {
      const user = state.users[userId]
      // check if the forum already has a post property
      if (!user.posts) {
        // set the post property
        Vue.set(user, 'posts', {})
      }
      // append the new post ID to the users posts object that contains the id's of the post that the user has written
      // append post to user
      Vue.set(user.posts, postId, postId)
    },

    appendThreadToForum (state, {forumId, threadId}) {
      const forum = state.forums[forumId]
      if (!forum.threads) {
        // set the post property
        Vue.set(forum, 'threads', {})
      }
      // append the threadId to the forum.threads property
      Vue.set(forum.threads, threadId, threadId)
    },

    appendThreadToUser (state, {userId, threadId}) {
      const user = state.users[userId]
      if (!user.threads) {
        // set the post property
        Vue.set(user, 'threads', {})
      }
      // append post to forum
      Vue.set(user.threads, threadId, threadId)
    }
  }
})
