
<template>
  <div id="page--showcase">
    <h1 id="page-title">{{name}}</h1>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/sass/app.scss";
</style>
