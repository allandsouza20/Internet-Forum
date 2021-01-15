import firebase from 'firebase'

export default {

  createPost ({commit, state}, post) {
    // const postId = 'greatPost' + Math.random()   // we are generating an id since newPost does not have an id
    // generate a id for posts from firebase
    const postId = firebase.database().ref('posts').push().key
    // post['.key'] = postId
    post.userId = state.authId
  // Date.now() can be used to get the current timestamp. it returns the timestamp in milliseconds.
  // to get it in seconds, we can divide it by 1000
  // Math.floor returns the largest integer that is less than or equal to the given number
    post.publishedAt = Math.floor(Date.now() / 1000)

    const updates = {}
    updates[`posts/${postId}`] = post
    updates[`threads/${post.threadId}/posts/${postId}`] = postId
    updates[`threads/${post.threadId}/contributors/${post.userId}`] = post.userId
    updates[`users/${post.userId}/posts/${postId}`] = postId
    firebase.database().ref().update(updates)
      .then(() => {
        // this ensures that the commits occur after the update
        commit('setItem', {resource: 'posts', item: post, id: postId})
        commit('appendPostToThread', {parentId: post.threadId, childId: postId})
        commit('appendContributorToThread', {parentId: post.threadId, childId: post.userId})
        commit('appendPostToUser', {parentId: post.userId, childId: postId})
        return Promise.resolve(state.posts[postId])
      })
  },

  createThread ({state, commit, dispatch}, {text, title, forumId}) {
    return new Promise((resolve, reject) => {
      // const threadId = 'greatThread' + Math.random()
      // get a unique key
      const threadId = firebase.database().ref('threads').push().key
      const postId = firebase.database().ref('posts').push().key
      const userId = state.authId
    // Date.now() can be used to get the current timestamp. it returns the timestamp in milliseconds.
    // to get it in seconds, we can divide it by 1000
    // Math.floor returns the largest integer that is less than or equal to the given number
      const publishedAt = Math.floor(Date.now() / 1000)

      const thread = {title, forumId, publishedAt, userId, firstPostId: postId, posts: {}}
      thread.posts[postId] = postId
      const post = {text, publishedAt, threadId, userId}

      const updates = {}
      // set thread
      updates[`threads/${threadId}`] = thread
      // append it to the forum
      updates[`forums/${forumId}/threads/${threadId}`] = threadId
      // append it to the user
      updates[`users/${userId}/threads/${threadId}`] = threadId

      updates[`posts/${postId}`] = post
      updates[`users/${userId}/posts/${postId}`] = postId
      firebase.database().ref().update(updates)
        .then(() => {
          // update thread
          commit('setItem', {resource: 'threads', id: threadId, item: thread})
          commit('appendThreadToForum', {parentId: forumId, childId: threadId})
          commit('appendThreadToUser', {parentId: userId, childId: threadId})
          // update post
          commit('setItem', {resource: 'posts', item: post, id: postId})
          commit('appendPostToThread', {parentId: post.threadId, childId: postId})
          commit('appendPostToUser', {parentId: post.userId, childId: postId})

          resolve(state.threads[threadId])
          // return Promise.resolve(state.posts[postId])
        })
    })
  },

  createUser ({state, commit}, {id, email, name, username, avatar = null}) {
    return new Promise((resolve, reject) => {
      const registeredAt = Math.floor(Date.now() / 1000)
      const usernameLower = username.toLowerCase()
      email = email.toLowerCase()
      const user = {avatar, email, name, username, usernameLower, registeredAt}
      firebase.database().ref('users').child(id).set(user)
        .then(() => {
          commit('setItem', {resource: 'users', id: id, item: user})
          resolve(state.users[id])
        })
    })
  },

  registerUserWithEmailAndPassword ({dispatch}, {email, name, username, password, avatar = null}) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        return dispatch('createUser', {id: user.uid, email, name, username, password, avatar})
      })
  },

  signInWithEmailAndPassword (context, {email, password}) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },

  signOut ({commit}) {
    return firebase.auth().signOut()
      .then(() => {
        commit('setAuthId', null)
      })
  },

  updateThread ({state, commit, dispatch}, {title, text, id}) {
    return new Promise((resolve, reject) => {
      const thread = state.threads[id]
    // const post = state.posts[thread.firstPostId]
      const post = state.posts[thread.firstPostId]
    // const newPost = {...post, text}

    // commit('setPost', {post: newPost, postId: thread.firstPostId})

    // NOTE: The dispatch function is used to call an action
      const edited = {
        at: Math.floor(Date.now() / 1000),
        by: state.authId
      }

      const updates = {}
      updates[`posts/${thread.firstPostId}/text`] = text
      updates[`posts/${thread.firstPostId}/edited`] = edited
      updates[`threads/${id}/title`] = title
      firebase.database().ref().update(updates)
        .then(() => {
          commit('setThread', {thread: {...thread, title}, threadId: id})
          commit('setPost', {postId: thread.firstPostId, post: {...post, text, edited}})
          resolve(post)
        })
    })
  },

  updatePost ({state, commit}, {id, text}) {
    return new Promise((resolve, reject) => {
    //   find the post of the state using it's id
      const post = state.posts[id]
      const edited = {
        at: Math.floor(Date.now() / 1000),
        by: state.authId
      }

      const updates = {text, edited}
      firebase.database().ref('posts').child(id).update(updates)
        .then(() => {
          commit('setPost', {postId: id, post: {...post, text, edited}})
          resolve(post)
        })
    })
  },
  // the only job of this action is to commit the setUser mutation
  updateUser ({commit}, user) {
  // the payload here is the userId that we can access under the key property of the user object
    commit('setUser', {userId: user['.key'], user})
  },

  fetchAuthUser ({dispatch, commit}) {
    const userId = firebase.auth().currentUser.uid
    return dispatch('fetchUser', {id: userId})
      .then(() => {
        commit('setAuthId', userId)
      })
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
