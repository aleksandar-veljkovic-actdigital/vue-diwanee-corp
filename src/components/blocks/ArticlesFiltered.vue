<template>
  <div id="article-list">

    <Filters />

    <section>

      <article v-for="article in articlesDisplay">
        <router-link :to="{name: 'Article', params: {id: article.id}}">
          {{setDataImg(article)}} <!-- opens posibility for asinc image (e.g. kaltura poster cover) -->
          <div class="img-w">
            <img :src=article.img alt='' />
          </div>
          <h2>{{article.title}}</h2>
          <h6>{{article.content_description}}</h6>
        </router-link>
      </article>

      <Loading v-show='loading' />

    </section>

  </div>
</template>



<style lang="scss" scoped>

@import "../../assets/sass/app.scss";

a, a:visited,
a:visited, a:visited h2 {
  //color: #42b983;
  text-decoration: none;
  outline: 0 solid transparent;
  color: black;
}

@include device(mobile){
  section {
    article {
      @include gutter;
      position: relative;
      overflow: hidden;
      margin-bottom: 1.1rem;
      .img-w {
        padding-bottom: #{ (200/350) * 100%};
        overflow: hidden;
        position: relative;
        margin-bottom: 0.9rem;
        img {
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          width: 100%;
        }
      }
      h2 {
        font-family: "Playfair Display", serif;
        font-size: 1.4rem;
        margin: 0 0 0rem;
      }
      h6 {
        font-weight: normal;
        font-size: 1rem;
        font-weight: 300;
        margin: 0 0 0rem;
        font-family: $sans;
      }
    }
  }
}

@include device(desktop){
  section {
    @include gutter;
    position: relative;
    overflow: hidden;
    text-align: center;
    article {
      $gut: 1%;
      width: 31.33%;
      margin-right: 3%;
      display: inline-block;
      position: relative;
      overflow: hidden;
      margin-bottom: 2.1rem;
      text-align: left;
      &:nth-child(3n+3) {
        margin-right: 0%;
      }
      .img-w {
        padding-bottom: #{ (200/350) * 100%};
        overflow: hidden;
        position: relative;
        margin-bottom: 0.9rem;
        img {
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          width: 100%;
        }
      }
      h2 {
        font-family: "Playfair Display", serif;
        font-size: 1.4rem;
        margin: 0 0 0rem;
        white-space: nowrap;
        overflow: hidden;
      }
      h6 {
        font-weight: normal;
        font-size: 1rem;
        font-weight: 300;
        margin: 0 0 0rem;
        font-family: $sans;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}

</style>



<script>

import Loading from '@/components/blocks/Loading'

import Filters from '@/components/blocks/Filters'

export default {

  created() {
    this.getArticles();
    window.__articlesFiltered = this;
  },

  components: {
    Loading,
    Filters
  },

  props: [
    'query',
  ],

  watch: {
    'query': function() {
      this.filtersChanged();
    },
  },

  data () {
    return {
      articlesDisplay: [],
      articlesAll: [],
      loading: true,
    }
  },

  methods: {

    filtersChanged: function(filters) {
      var _this = this;
      var filterTags = _this.filterTags();
      // if filters are unselected
      if (filterTags.length === 0) {
        _this.articlesDisplay = _this.articlesAll.slice(0);
        return;
      }
      _this.articlesDisplay = _this.articlesAll.filter((article, ix) => {
        let articleTags = article.tags.map((articleTagObj) => {return articleTagObj.id});
        let match = filterTags.filter((filterTag) => {
          return _this.inArray(filterTag, articleTags)
        });
        return (filterTags.length === match.length);
      });
    },

    //
    // REQUESTS
    //

    filterTags(){
      return [
        this.query.publications,
        this.query.brands,
        this.query.categories,
        this.query.influencers,
      ]
      .map((tagId, ix) => {
        return (!!parseInt(tagId)) ? parseInt(tagId) : false;
      })
      .filter((tag) => {
        return (!!tag)
      })
    },

    getArticles: function(){
      var _this = this;
      this.$http.get("http://192.168.0.111:1010/api/articles")
      .then(function(response){
        _this.articlesAll = response.data
        _this.filtersChanged();
        _this.loading = false;
      });
    },

    //
    // HELPER METHODS
    //

    inArray: function(needle, haystack) {
      haystack = (Array.isArray(haystack)) ? haystack : [];
      var match = haystack.filter( item => {
        return (item === needle)
      });
      return (match.length > 0);
    },

  },

}

</script>
