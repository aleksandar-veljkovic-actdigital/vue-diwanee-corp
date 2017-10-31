<template>

  <div class="in-article-slider">
    <svg class="space-holder" viewBox="0 0 350 200"></svg>
    <div :id=id class="swipe">
      <div class="swipe-wrap">
        <div class="swipe-item" v-for="slide in data" >
          <img class="swipe-img" :src="slide.data.file.url">
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

@import "../../assets/sass/app.scss";

.in-article-slider {
  @include gutter;
  position: relative;
  margin-bottom: 1rem;
  svg.space-holder {
    width: 1px;
    min-width: 100%;
    height: auto;
    display: block;
  }

  .swipe {
    overflow: hidden;
    visibility: hidden;
    position: relative;
  }
  .swipe-wrap {
    overflow: hidden;
    position: relative;
  }
  .swipe-wrap > .swipe-item {
    float: left;
    display: block;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .swipe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .swipe-wrap {
      height: 100%;
      width: 100%;
      .swipe-item {
        height: 100%;
        .swipe-img {
          width: 100%;
        }
      }
    }
  }

}



</style>

<script>

import Swipe from 'swipejs'

export default {

  mounted() {
    window.sss = window.sss || {};
    window.sss[this.id] = new Swipe(document.getElementById(this.id), {draggable:true, continuous: false});
  },

  props: [
    'data',
  ],

  data() {
    return {
      id: "slider-" + this._uid,
    }
  }
}

</script>
