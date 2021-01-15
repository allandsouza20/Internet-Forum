import {countObjectProperties} from '../utils'

export default {
  // a getter can be used anywhere in our application
  authUser (state) {
    // return state.users[state.authId]
    return {}
  },

  //  getters used to return the count of the users posts and the thread count
  usersThreadsCount: state => id => countObjectProperties(state.users[id].threads),
  usersPostsCount: state => id => countObjectProperties(state.users[id].posts),
  threadRepliesCount: state => id => countObjectProperties(state.threads[id].posts) - 1
}
