<template>
  <div id="page--showreel">

    <div>showreel :: $router.query :: <strong>{{ $router.query }}</strong></div>
    <div>showreel :: $router.params :: <strong>{{ $router.params }}</strong></div>


    <div>showreel :: path0 :: <strong>{{ params.path0 }}</strong></div>
    <div>showreel :: query :: <strong>{{ query.boban }}</strong></div>



    <!--ArticlesFiltered :boban="boban" /-->

  </div>
</template>

<script>

import Vue from 'vue'
import ArticlesFiltered from './blocks/ArticlesFiltered'
Vue.component('ArticlesFiltered', ArticlesFiltered);

export default {



  created() {
    window.__this = this;
  },

  data () {
    return {
        //stojan: this.$route.query
      }
    },
    props: [
      'params',
      'query'
    ],

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
