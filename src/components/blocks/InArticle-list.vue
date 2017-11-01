<template>

  <div class="in-article-list">
    <ul>
      <li v-for="item in data.data.listItems" v-html="item.content"></li>
    </ul>
  </div>

</template>

<style lang="scss" scoped>

  @import "../../assets/sass/app.scss";

  @include device(mobile) {
    .in-article-list {
      @include gutter;
      margin-bottom: $bottom;
    }
  }

  @include device(desktop) {
    .in-article-list {
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
