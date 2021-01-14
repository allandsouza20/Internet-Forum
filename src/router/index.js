// This file contains the logic for our app
import Vue from 'vue'
import Router from 'vue-router'
// Notice that we can specify any name when we import a component
import Home from '@/pages/HomePage'
import ThreadShow from '@/pages/PageThreadShow'
import ThreadCreate from '@/pages/PageThreadCreate'
import Category from '@/pages/PageCategory'
import Forum from '@/pages/PageForum'
import Profile from '@/pages/PageProfile'
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
      path: '/category/:id',
      name: 'Category',
      component: Category,
      // to set the route parameters as component props, we must set props to true
      props: true
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: Forum,
      // to set the route parameters as component props, we must set props to true
      props: true
    },
    {
      // here, :id defines a dynamic segment
      // NOTE: The router always tries to match a route from the top to the bottom
      path: '/thread/create',
      name: 'ThreadCreate',
      component: ThreadCreate,
      props: true
    },
    {
      // here, :id defines a dynamic segment
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadShow,
      props: true
    },
    {
      // here, :id defines a dynamic segment
      path: '/me',
      name: 'Profile',
      component: Profile,
      props: true
    },
    {
      // here, :id defines a dynamic segment
      path: '/me/edit',
      name: 'ProfileEdit',
      component: Profile,
      props: {edit: true}
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
