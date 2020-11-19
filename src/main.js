// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// The place to define the logic that affects the main application is main.js

// This is the application's entry file
// import router imports the router file. It is then passed as a option to the vue instance. This way, all the application components are aware of the router and they have special access to the router vue
import Vue from 'vue'
import App from './App'
import router from './router'
import AppDate from '@/components/AppDate'

// This is used to register a component globally, meaning, it can be used within any other component without having to register it
// Syntax: Vue.component(tagName, options)
Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
