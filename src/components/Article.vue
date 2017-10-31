
<template>

  <div id="page--article">
    <h1 id="page-title">{{article.title}}</h1>
    <component v-for="component in bodyElements" v-bind:is="component.type" :data="component.data"></component>
  </div>

</template>



<script>

  import Vue from 'vue'
  import listComponent from './blocks/InArticle-list'
  import videoComponent from './blocks/InArticle-video'
  import textComponent from './blocks/InArticle-text'
  import sliderComponent from './blocks/InArticle-slider'
  import diwanee_imageComponent from './blocks/InArticle-diwanee_image'

  export default {

    created() {
      this.getArticle();
      window.__article = this
    },

    data () {
      return {
        article: {},
        bodyElements: [],
        selectedComponent: "",
      }
    },

    components: {
      listComponent,
      videoComponent,
      textComponent,
      diwanee_imageComponent,
      sliderComponent,
    },

    props: [
      'id',
    ],

    methods: {

      getArticle: function(){
        var _this = this;
        this.$http.get("http://192.168.0.111:1010/api/articles/"+_this.id).then(
          function(response){
            _this.article = response.data;
            _this.parseBodyElements(_this.article);
          },
          function(response){
            console.log('this.$http.get error');
          }
        );
      },

      parseBodyElements: function(article){
        var _this = this;
        _this.bodyElements = [];
        _this.bodyElements = article.elements.reduce(function(total, element, ix){
          if (element.type === "slider_image") {
            if (article.elements[ix-1].type !== "slider_image") {
              total.push( {type:"sliderComponent", data:[element]} );
            }
            else {
              total[total.length-1].data.push(element);
            }
          }
          else {
            total.push( {type:element.type+"Component", data:element} )
          }
          return total
        }, []);
      }

    }

  }

</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/sass/app.scss";
</style>
