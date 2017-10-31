<template>
  <div id="app">
    <!-- layout goes hire -->
    <header>
      <router-link :to='{name:"Diwanee Showcase"}'>
        <img class='logo-img' src="./assets/img/diwanee-logo--dark.svg"/>
      </router-link>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
    </footer>
  </div>
</template>



<script>
  export default {
    name: 'app',
  }
</script>



<style lang="scss">

  @import "assets/sass/app.scss";

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: black;
    header {
      min-height: 90px;
      .logo-img {
        width: 103px;
        padding: 20px;
        display: block;
      }
    }
  }

</style>
