import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// install the vuex plugin in the application
Vue.use(Vuex)

// export the Vuex store
export default new Vuex.Store({
  state: {
    // ... is called a spread operator
    // ...sourceData,
    categories: {},
    forums: {},
    threads: {},
    posts: {},
    users: {},
    authId: null    // authId is used to grab the authenticated user from the state
  },
  getters,
  actions,
  mutations
})
