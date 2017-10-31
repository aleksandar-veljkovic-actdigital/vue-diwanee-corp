<template>

  <div class="in-article-text" v-html="data.data.text" />

</template>

<style lang="scss" scoped>

  @import "../../assets/sass/app.scss";

  .in-article-text {
    @include gutter;
  }

</style>

<script>
    export default {
      props: [
        'data',
      ]
    }
</script>
