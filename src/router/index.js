import Vue from 'vue'
import Router from 'vue-router'
import Showreel from '@/components/Showreel'

Vue.use(Router)

console.log(Router);

export default new Router({
  //props: true,
  routes: [
    {
      path: '/:path0/',
      name: 'Diwanee Showreel',
      component: Showreel,
      props: (route) => ({
        query: route.query,
        params: route.params
      })
    }
  ]
});


      //path: '/:selected.publication/:selected.type/:selected.brand/:selected.category/:selected.subcategory',
