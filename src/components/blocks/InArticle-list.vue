<template>

  <div class="in-article-list">
    <ul>
      <li v-for="item in data.data.listItems" v-html="item.content"></li>
    </ul>
  </div>

</template>

<style lang="scss" scoped>

  @import "../../assets/sass/app.scss";

</style>

<script>
    export default {
      props: [
        'data',
      ]
    }
</script>
