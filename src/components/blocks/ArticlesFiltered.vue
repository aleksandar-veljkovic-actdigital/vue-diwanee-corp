<template>
  <div id="article-list">

    --------------------------
    <div>showreel :: boban :: {{ boban }}</div>
    <div>showreel :: $router.params.boban :: {{ boban }}</div>
    <form>

      <select id='publication-select' v-model="selected.publications" v-on:change="filtersChanged()">
        <option value="0">by publication</option>
        <option v-for="publication in filters.publications" :value=publication.id>{{publication.name}}</option>
      </select>

      <select id='brand-select' v-model="selected.brands" v-on:change="filtersChanged()">
        <option value="0">by brand</option>
        <option v-for="brand in filters.brands" :value=brand.id>{{brand.name}}</option>
      </select>

      <select id='type-select' v-model="selected.types" v-on:change="filtersChanged()">
        <option value="0">by type</option>
        <option v-for="type in filters.types" :value=type.id>{{type.name}}</option>
      </select>

      <select id='category-select' v-model="selected.categories" v-on:change="filterCategoryChanged();filtersChanged()">
        <option value="0">by category</option>
        <option v-for="category in filters.categories" :value=category.id>{{category.name}}</option>
      </select>

      <select id='subcategory-select' v-model="selected.subcategories" v-on:change="filtersChanged();">
        <option value="0"> - </option>
        <option v-for="subcategory in filters.subcategoriesDisplay" :value=subcategory.id>{{subcategory.name}}</option>
      </select>

    </form>

    <section>
      <article v-for="article in articlesDisplay">
        <h2>{{article.title}}</h2>
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

  props: ['boban'],

  data () {
    return {
      articlesDisplay: [],
      articlesAll: [],
      selected: {
        publications: 0,
        brands: 0,
        types: 0,
        categories: 0,
        subcategories: 0
      },
      filters: {
        publications: [],
        brands: [],
        types: [],
        categories: [],
        subcategories: [],
        subcategoriesDisplay: []
      },
      tags: [],
    }
  },


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
          case 'type' :
            filters.types.push(tag);
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
    }

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
