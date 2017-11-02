<template>

  <div class="loading">
    <img src='../../assets/img/loading.gif' >
  </div>

</template>

<style lang="scss" scoped>

  @import "../../assets/sass/app.scss";

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(255,255,255,.7);
    width: 100%;
    width: 100vw;
    height: 100%;
    height: 100vh;
    z-index: 9999;
    img {
      display: block;
      @include center;
    }
  }



</style>

<script>



    export default {
      props: [
        'desiredComponent',
      ],
    }

</script>
