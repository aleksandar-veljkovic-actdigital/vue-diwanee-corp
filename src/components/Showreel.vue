
<template>

  <div id="page--showreel">

    <ArticlesFiltered :query="query" />

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
      'query',
      //'params',
    ],

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
