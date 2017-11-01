<template>
  <div id="app">
    <!-- layout goes hire -->
    <header>
      <router-link :to='{name:"Diwanee Showcase"}'>
        <img class='logo-img' src="./assets/img/diwanee-logo--dark.svg"/>
      </router-link>
    </header>
    <main>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>


    </main>

    <mFooter />

  </div>
</template>



<script>

  import mFooter from './components/blocks/mFooter'

  export default {
    name: 'app',
    components: {
      mFooter
    }
  }
</script>



<style lang="scss">

  @import "assets/sass/app.scss";

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: $sans;
    font-weight: 300;
  }
  h1,h2,h3,h4,h5,h6 {
    font-family: $serif;
  }

  h1 {
    @include gutter;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: black;
    header {
      min-height: 90px;
      .logo-img {
        width: 143px;
        padding: 20px;
        display: block;
      }
    }
  }

</style>
