<template>

  <div class="in-article-video">
    <iframe class="yt-video" width="350" height="200" :src="'https://www.youtube.com/embed/' + data.data.remote_id" frameborder="0" allowfullscreen></iframe>
  </div>

</template>

<style lang="scss" scoped>

  @import "../../assets/sass/app.scss";

 .in-article-video {
   @include gutter;
   position: relative;
   iframe.yt-video {
     width: 1px;
     min-width: 100%;
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
