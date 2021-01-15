import Vue from 'vue'

// this function returns the function that is the actual mutation
const makeAppendChildToParentMutation = ({parent, child}) =>
  (state, {childId, parentId}) => {
    const resource = state[parent][parentId]   // user.name === user['name']
    // check if the forum already has a post property
    if (!resource[child]) {
      // set the post property
      Vue.set(resource, child, {})
    }
    // to use Vue set, we'll have to import Vue, instead of this, we can use the instance alias, i.e. this.$set
    // parameters are object, propertyName, value
    // append post to forum
    Vue.set(resource[child], childId, childId)
  }
export default {
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

  setItem (state, {item, id, resource}) {
    item['.key'] = id
    Vue.set(state[resource], id, item)
  },

  appendPostToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'}),

  appendContributorToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'contributors'}),

  appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}),

  appendThreadToForum: makeAppendChildToParentMutation({parent: 'forums', child: 'threads'}),

  appendThreadToUser: makeAppendChildToParentMutation({parent: 'users', child: 'threads'})
}
