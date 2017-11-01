<template>
  <div id="app">
    <!-- layout goes hire -->
    <header id="header">
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

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: black;
    max-width: 1600px;
    margin: 0 auto;
  }



  @include device(mobile) {
    header#header {
      min-height: 90px;
      .logo-img {
        @include gutter;
        width: 104px;
        padding: 18px 0 0;
        display: block;
      }
    }
    #page-title {
      @include gutter;
      font-family: "Playfair Display", serif;
      font-size: 1.7rem;
      text-align: center;
      margin-top: 0;
      margin-bottom: 2.4rem;
    }
    #page-preamble {
      display: none;
    }
  }

  @include device(desktop) {
    header#header {
      min-height: 140px;
      .logo-img {
        @include gutter;
        width: 247px;
        padding: 40px 0 0 90px;
        display: block;
      }
    }
    h1#page-title {
      @include gutter;
      font-family: "Playfair Display", serif;
      font-size: 4.75rem;
      text-align: center;
      margin-top: 0;
      margin-bottom: 2.0rem;
    }
    #page-preamble {
      @include narrow;

      text-align: center;

      margin-bottom: 5.7rem;
      margin-top: 0;
      font-weight: normal;
      font-size: 1.24rem;
      line-height: 1.9rem;
    }
  }


</style>
