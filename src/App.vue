<template>
  <div id="app">
    <!-- layout goes hire -->

    <header>
      <img class='logo-img' src="./assets/img/diwanee-logo--dark.svg"/>
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
    config:{
      breakPoints: {
        medium: 640,
        large: 1024
      }
    }
  }
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: black;

  header {
    .logo-img {
      width: 150px;
      display: block;
    }
  }
}
</style>
