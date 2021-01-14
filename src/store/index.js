import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'

// install the vuex plugin in the application
Vue.use(Vuex)

// export the Vuex store
export default new Vuex.Store({
  state: sourceData

})
