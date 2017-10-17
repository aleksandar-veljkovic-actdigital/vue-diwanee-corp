import Vue from 'vue'
import Router from 'vue-router'
import Showreel from '@/components/Showreel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Diwanee Showreel',
      component: Showreel
    }
  ]
})
