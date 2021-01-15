import firebase from 'firebase'

export default {

  createPost ({commit, state}, post) {
    const postId = 'greatPost' + Math.random()   // we are generating an id since newPost does not have an id
    post['.key'] = postId
    post.userId = state.authId
  // Date.now() can be used to get the current timestamp. it returns the timestamp in milliseconds.
  // to get it in seconds, we can divide it by 1000
  // Math.floor returns the largest integer that is less than or equal to the given number
    post.publishedAt = Math.floor(Date.now() / 1000)
    commit('setPost', {post, postId})
    commit('appendPostToThread', {parentId: post.threadId, childId: postId})
    commit('appendPostToUser', {parentId: post.userId, childId: postId})

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
      commit('appendThreadToForum', {parentId: forumId, childId: threadId})
      commit('appendThreadToUser', {parentId: userId, childId: threadId})

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
  },

  fetchCategory: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'categories', id, emoji: '🎄'}),
  fetchForum: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'forums', id, emoji: '🎄'}),
  fetchThread: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'threads', id, emoji: '🎄'}),
  fetchPost: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'posts', id, emoji: '🧨'}),
  fetchUser: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'users', id, emoji: '🧧'}),

  fetchCategories: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'categories', ids, emoji: '🎍'}),
  fetchForums: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'forums', ids, emoji: '🎍'}),
  fetchThreads: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'threads', ids, emoji: '🎍'}),
  fetchPosts: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'posts', ids, emoji: '🎏'}),
  fetchUsers: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'users', ids, emoji: '🎏'}),

  fetchAllCategories ({state, commit}) {
    console.log('🎈', '🎟', 'all')
  //  read the whole categories object
    return new Promise((resolve, reject) => {
      firebase.database().ref('categories').once('value', snapshot => {
        const categoriesObject = snapshot.val()
        Object.keys(categoriesObject).forEach(categoryId => {
          const category = categoriesObject[categoryId]
          commit('setItem', {resource: 'categories', id: categoryId, item: category})
        })
        resolve(Object.values(state.categories))
      })
    })
  },

  fetchItem ({state, commit}, {id, emoji, resource}) {
    console.log('🔥', emoji, id)
    return new Promise((resolve, reject) => {
    // fetch thread
      firebase.database().ref(resource).child(id).once('value', snapshot => {
        commit('setItem', {resource, id: snapshot.key, item: snapshot.val()})
        resolve(state[resource][id])
      })
    })
  },

  fetchItems ({dispatch}, {ids, resource, emoji}) {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)
  // Promise.all receives a array and returns a single promise that resolves when all the promises of the array are resolved
    return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource, emoji})))
  }
}
