
<template>
  <div id="page--showcase">
    <h1 id="page-title">{{name}}</h1>
    <h4 id="page-preamble">Small descrioton on what can be foound on this section Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis odio ante.</h4>
    <ArticlesFiltered :query="query" />
  </div>
</template>



<script>

import Vue from 'vue'
import ArticlesFiltered from './blocks/ArticlesFiltered'
Vue.component('ArticlesFiltered', ArticlesFiltered);

export default {

  created() {
    window.__showcase = this
  },

  data () {
    return {
      name: this.$route.name
    }
  },

  props: [
    'query',
    //'params',
  ],

}

</script>
