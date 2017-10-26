import Vue from 'vue'
import Router from 'vue-router'
import Showcase from '@/components/Showcase'

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
    }
  ]
});
