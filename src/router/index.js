import Vue from 'vue'
import Router from 'vue-router'

import Showcase from '@/components/Showcase'
import Article from '@/components/Article'
import Error404 from '@/components/Error404'

Vue.use(Router)

export default new Router({
  //props: true,
  routes: [
    {
      path: '/',
      name: 'Diwanee Showcase',
      component: Showcase,
      props: (route) => ({
        query: route.query,
        //params: route.params
      })
    },
    {
      path: '/art/:id',
      name: 'Article',
      component: Article,
      props: (route) => ({
        id: route.params.id

      })
    },
    {
      path: "*",
      name: "404 not found",
      component: Error404,
    }
  ]
});
