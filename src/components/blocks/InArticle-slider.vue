<template>

  <div class="in-article-slider">
    <img class="slider-img" v-for="slide in data" :src="slide.data.file.url">
  </div>

</template>

<style lang="scss" scoped>

  @import "../../assets/sass/app.scss";

  .in-article-slider {
      @include gutter;
      position: relative;
      .slider-img {
        width: 100%;
        display: none;
      }
      .slider-img:first-child {
        display: block;
      }
  }

</style>

<script>
    export default {
      props: [
        'data',
      ]
    }
</script>
