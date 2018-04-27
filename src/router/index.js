import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import FractionsPage from '@/components/FractionsPage'
import CommentsPage from '@/components/CommentsPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/fractions',
      component: FractionsPage
    },
    {
      path: '/comments',
      component: CommentsPage
    }
  ]
})
