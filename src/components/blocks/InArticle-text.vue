<template>

  <div class="in-article-text" v-html="data.data.text" />

</template>

<style lang="scss" scoped>

  @import "../../assets/sass/app.scss";

  @include device(mobile) {
    .in-article-text {
      @include gutter;
      margin-bottom: $bottom;
    }
  }

  @include device(desktop) {
    .in-article-text {
      @include narrow;
      margin-bottom: $bottom;
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
