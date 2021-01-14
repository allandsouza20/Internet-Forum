// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// The place to define the logic that affects the main application is main.js

// This is the application's entry file
// import router imports the router file. It is then passed as a option to the vue instance. This way, all the application components are aware of the router and they have special access to the router vue
import Vue from 'vue'
import firebase from 'firebase'
import App from './App'
import router from './router'
import store from '@/store'
import AppDate from '@/components/AppDate'

// This is used to register a component globally, meaning, it can be used within any other component without having to register it
// Syntax: Vue.component(tagName, options)
Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

// Initialise firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAFX_fYiG9c_nsM4SIMI3GSuobBQ8xPfFQ',
  authDomain: 'forum-fb611.firebaseapp.com',
  projectId: 'forum-fb611',
  storageBucket: 'forum-fb611.appspot.com',
  messagingSenderId: '741108783794',
  appId: '1:741108783794:web:c701918c79fcd66837c7ab',
  measurementId: 'G-6GR2TPYH9D'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // inject store into all components. This is the shorthand for store: store
  store,
  template: '<App/>',
  components: { App }
})
