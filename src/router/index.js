// This file contains the logic for our app
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ThreadShow from '@/components/ThreadShow'
// This tells vue to use the router plugin
Vue.use(Router)

// This exports a new router instance that contains the routes option
// Here, the path / directs us to the HelloWorld component
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      // here, :id defines a dynamic segment
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadShow,
      props: true
    }
  ],
  // this will remove the # from the url
  mode: 'history'
})
