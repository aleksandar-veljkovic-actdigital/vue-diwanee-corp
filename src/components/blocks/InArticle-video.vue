<template>

  <div class="in-article-video">
    <svg class="space-holder" viewBox="0 0 350 200"></svg>
    <iframe class="yt-video" width="350" height="200" :src="'https://www.youtube.com/embed/' + data.data.remote_id" frameborder="0" allowfullscreen></iframe>
  </div>

</template>

<style lang="scss" scoped>

  @import "../../assets/sass/app.scss";

 .in-article-video {
   @include gutter;
   position: relative;
   margin-bottom: $bottom;
   svg {
     width: 100%;
     height: auto;
     max-height: 75vh;
   }
   iframe.yt-video {
     position: absolute;
     top: 0;
     left: 0;
     width: 1px;
     min-width: 100%;
     height: 1px;
     min-height: 100%;
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
