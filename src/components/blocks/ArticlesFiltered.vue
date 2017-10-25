<template>
  <div id="article-list">

    <form>

      <select id='publication-select' v-model="selected.publications" v-on:change="filtersChanged()">
        <option value="0">by publication</option>
        <option v-for="publication in filters.publications" :value=publication.id>{{publication.name}}</option>
      </select>

      <select id='brand-select' v-model="selected.brands" v-on:change="filtersChanged()">
        <option value="0">by brand</option>
        <option v-for="brand in filters.brands" :value=brand.id>{{brand.name}}</option>
      </select>

      <select id='category-select' v-model="selected.categories" v-on:change="filterCategoryChanged();filtersChanged()">
        <option value="0">by category</option>
        <option v-for="category in filters.categories" :value=category.id>{{category.name}}</option>
      </select>

      <select id='influencer-select' v-model="selected.influencers" v-on:change="filtersChanged()">
        <option value="0">by influencer</option>
        <option v-for="influencer in filters.influencers" :value=influencer.id>{{influencer.name}}</option>
      </select>

      <!--
      <select id='subcategory-select' v-model="selected.subcategories" v-on:change="filtersChanged();">
        <option value="0"> - </option>
        <option v-for="subcategory in filters.subcategoriesDisplay" :value=subcategory.id>{{subcategory.name}}</option>
      </select>
      -->

    </form>

    <section>
      <article v-for="article in articlesDisplay">

        <h2>{{article.title}}</h2>
        {{setDataImg(article)}} <!-- opens posibility for asinc image (e.g. kaltura poster cover) -->
        <img :src=article.img alt='' />

        <hr />
      </article>

    </section>

  </div>
</template>

<script>

export default {
  created() {
    this.getTags();
    this.getArticles();

    window.dbg = this;
  },

  props: ['query'],

  data () {
    return {
      articlesDisplay: [],
      articlesAll: [],
      selected: {
        publications: 0,
        brands: 0,
        influencers: 0,
        categories: 0,
        subcategories: 0
      },
      filters: {
        publications: [],
        brands: [],
        influencers: [],
        categories: [],
        subcategories: [],
        subcategoriesDisplay: []
      },
      tags: [],
    }
  },
/*
  watch: {
    'articlesDisplay.0.img': {
      handler: function(){  console.log('--'); }
    }
  },
*/
/*
  watch: {
    'img': function(){console.log('watch')},
    'articlesDisplay.img': function(){console.log('watch.')},
    'articlesDisplay.0.img': function(){  console.log('watch articlesDisplay.0.img'); }

  },


  computed: {
    'img': function(){console.log('computed')},
    'articlesDisplay.img': function(){console.log('computed.')},
    'articlesDisplay.0.img': function(){  console.log('computed articlesDisplay.0.img'); }

  },

*/
  methods: {

    //
    // REQUESTS
    //

    getArticles: function(){
      var _this = this;
      this.$http.get("http://192.168.0.111:1010/api/articles")
        .then(function(response){
          _this.articlesAll = response.data
          _this.articlesDisplay = response.data
        });

    },

    getTags: function(){
      var _this = this;
      this.$http.get("http://192.168.0.111:1010/api/tags")
        .then(function(response){
          _this.tags = response.data;
          _this.parseFilters();
          if (_this.$route.query.filter) {
            _this.selected = JSON.parse(_this.$route.query.filter);
          }
        });
    },

    //
    // PARSERS
    //

    parseFilters: function(){
      var tags = this.tags;
      var filters = this.filters;
      for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        switch (tag.type) {
          case 'publication' :
            filters.publications.push(tag);
            break;
          case 'brand' :
            filters.brands.push(tag);
            break;
          case 'influencer' :
            filters.influencers.push(tag);
            break;
          case 'category' :
            filters.categories.push(tag);
            break;
          case 'subcategory' :
            filters.subcategories.push(tag);
            filters.subcategoriesDisplay.push(tag);
            break;
        }
      }
    },

    //
    // EVENTS
    //

    filtersChanged: function() {
      var _this = this;
      var articlesFiltered = [];
      var filterTags = Object.values(_this.selected)
        .map( (tagId, ix) => {return (!!parseInt(tagId)) ? parseInt(tagId) : false;} )
        .filter( tag => {return (!!tag)} );
      __this.$router.push({ query: { filter: JSON.stringify(_this.selected) }})
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

    filterCategoryChanged: function(){
      var _this = this;
      var selectedCategoryId = parseInt(_this.selected.categories);
      if (selectedCategoryId === 0) {
        _this.filters.subcategoriesDisplay = _this.filters.subcategories.slice(0);
        _this.selected.subcategories = 0;
        return;
      }
      var selectedCategory = _this.extractById(selectedCategoryId, _this.filters.categories);
      _this.filters.subcategoriesDisplay = selectedCategory.children.slice(0);
      _this.selected.subcategories = 0;
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

    extractById: function(needle, haystack) {
      var _return = "not found";
      haystack.forEach((item) => {
        if( parseInt(item.id) === parseInt(needle) ) {
          _return = item;
          return false;
        }
      });
      return _return;
    },

    articleImages: function(article) {
      return article.elements.reduce(function(_imgs, element) {
        switch (element.type) {
          case 'diwanee_image' :
            _imgs.diwanee_image.push( element.content.file.url );
            break;
          case 'slider_image' :
            _imgs.slider_image.push( element.content.file.url );
            break;
          case 'video' :
            _imgs.video.push( element.content.remote_id );
            break;
        }
        return _imgs
      }, {diwanee_image:[],slider_image:[],video:[]});
    },

    setDataImg: function(article) {

      var imgs = this.articleImages(article);
      if (!!imgs.diwanee_image[0]) article.img = imgs.diwanee_image[0];
      else if (!!imgs.slider_image[0]) article.img = imgs.slider_image[0];
      else if (!!imgs.video[0]) article.img =  'https://img.youtube.com/vi/'+imgs.video[0]+'/hqdefault.jpg';
      else article.img =  "http://via.placeholder.com/350x150";
    },

  },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
