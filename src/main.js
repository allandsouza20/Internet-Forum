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
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

// to get the authenticated user from firebase
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('fetchAuthUser')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // inject store into all components. This is the shorthand for store: store
  store,
  template: '<App/>',
  components: { App }
})
