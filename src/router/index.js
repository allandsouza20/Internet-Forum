// This file contains the logic for our app
import Vue from 'vue'
import Router from 'vue-router'
// Notice that we can specify any name when we import a component
import Home from '@/pages/HomePage'
import ThreadShow from '@/components/ThreadShow'
import PageNotFound from '@/pages/PageNotFound'

// This tells vue to use the router plugin
Vue.use(Router)

// This exports a new router instance that contains the routes option
// Here, the path / directs us to the HelloWorld component
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      // here, :id defines a dynamic segment
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadShow,
      props: true
    },
    {
      // * symbol is used to catch all unmatched paths
      path: '*',
      name: 'NotFound',
      // instead of specifying just '/' in redirect, we can also use named routes by specifying {name: 'Home'}
      // redirect: {name: 'Home'}
      component: PageNotFound
    }
  ],
  // this will remove the # from the url
  mode: 'history'
})
