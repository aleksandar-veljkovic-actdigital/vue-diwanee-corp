import Vue from 'vue'
import Router from 'vue-router'
import Showreel from '@/components/Showreel'

Vue.use(Router)

export default new Router({
  //props: true,
  routes: [
    {
      path: '/',
      name: 'Diwanee Showreel',
      component: Showreel,
      props: (route) => ({
        query: route.query,
        //params: route.params
      })
    }
  ]
});
