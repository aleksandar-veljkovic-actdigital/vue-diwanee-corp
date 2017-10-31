<template>

  <div class="in-article-image">
    <img :src="data.data.file.url" alt="">
  </div>

</template>


<style lang="scss" scoped>

  @import "../../assets/sass/app.scss";

  .in-article-image {
    @include gutter;
    img {
      width: 100%;
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
