<template>

  <div>

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

  <div class="in-article-slider--dots">
    <svg v-for="slide in data" class="i-a-s--dot" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
  </div>

  </div>

</template>

<style lang="scss" scoped>

@import "../../assets/sass/app.scss";

.in-article-slider {
  @include gutter;
  position: relative;
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

.in-article-slider--dots {
  margin-bottom: $bottom;
  text-align: center;
  .i-a-s--dot {
    width: 10px;
    height: 10px;
    display: inline-block;
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
