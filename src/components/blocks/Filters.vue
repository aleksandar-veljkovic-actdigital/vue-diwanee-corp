<template>

  <form id="filters">

    <h3>Filter By</h3>

    <select class="select"id='publication-select' v-model="selected.publications" v-on:change="filtersChanged()">
      <option class="option" value="0">by publication</option>
      <option class="option" v-for="publication in filters.publications" :value=publication.id>{{publication.name}}</option>
    </select>

    <select class="select"id='brand-select' v-model="selected.brands" v-on:change="filtersChanged()">
      <option class="option" value="0">by brand</option>
      <option class="option" v-for="brand in filters.brands" :value=brand.id>{{brand.name}}</option>
    </select>

    <select class="select"id='category-select' v-model="selected.categories" v-on:change="filterCategoryChanged();filtersChanged()">
      <option class="option" value="0">by category</option>
      <option class="option" v-for="category in filters.categories" :value=category.id>{{category.name}}</option>
    </select>

    <select class="select"id='influencer-select' v-model="selected.influencers" v-on:change="filtersChanged()">
      <option class="option" value="0">by influencer</option>
      <option class="option" v-for="influencer in filters.influencers" :value=influencer.id>{{influencer.name}}</option>
    </select>

    <!--
    <select class="select"id='subcategory-select' v-model="selected.subcategories" v-on:change="filtersChanged();">
      <option class="option" value="0"> - </option>
      <option class="option" v-for="subcategory in filters.subcategoriesDisplay" :value=subcategory.id>{{subcategory.name}}</option>
    </select>
    -->

  </form>

</template>



<style lang="scss" scoped>

  @import "../../assets/sass/app.scss";

  @include device(mobile){
    form#filters {
      @include gutter;
      margin-bottom: 1.5rem;
      h3 {
        margin: 0 0 .8rem;
        text-transform: uppercase;
        font-size: 0.9rem;
        font-family: $sans;
        font-weight: 500;
      }
      .select {
        width: 100%;
        height: 2.5rem;
        text-align: center;
        text-align-last:center;
        background-color: white;
        border: 1px solid red;
        margin-bottom: 1.1rem;
        position: relative;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        &::-ms-expand {
          display: none;
        }
        &:focus {
          outline: none;
        }
        .option {
          text-align: center;
          width: 100%;
        }
      }
    }
  }

  @include device(desktop){
    form#filters {
      @include gutter;
      margin-bottom: 1.5rem;
      padding-left: 12.5%;

      @media (max-width: 1200px) {
        padding-left: 0;
      }
      h3 {
        margin: 0 0 1.8rem;
        text-transform: uppercase;
        font-size: 1rem;
        font-family: $sans;
        font-weight: 500;
      }
      .select {
        width: 160px;
        height: 2.5rem;
        margin: 0rem 16px 2.4rem 0;
        text-align: center;
        text-align-last:center;
        background-color: white;
        border: 1px solid red;
        position: relative;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        font-family: $sans;
        font-size: 1rem;
        &:last-child {
          margin-right: 0;
        }
        &::-ms-expand {
          display: none;
        }
        &:focus {
          outline: none;
        }
        .option {
          text-align: center;
          width: 100%;
        }
      }
    }
  }

</style>



<script>

  export default {

    created() {
      this.getTags();
      window.__filters = this;
    },

    components: {
    },

    props: [
      'query',
    ],

    data () {
      return {
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
        loading: true
      }
    },

    watch: {
      '$route.query': function(){
        this.parseFilters();
      }
    },

    methods: {

      //
      // REQUESTS
      //

      getTags: function(){
        var _this = this;
        this.$http.get("http://192.168.0.111:1010/api/tags")
        .then(function(response){
          _this.tags = response.data;
          _this.parseFilters();
          if (_this.$route.query.filter) {
            //_this.selected = JSON.parse(_this.$route.query.filter);
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
            if (tag.id==this.$route.query['publications']) this.selected['publications'] = tag.id;
            break;
            case 'brand' :
            filters.brands.push(tag);
            if (tag.id==this.$route.query['brands']) this.selected['brands'] = tag.id;
            break;
            case 'influencer' :
            filters.influencers.push(tag);
            if (tag.id==this.$route.query['influencers']) this.selected['influencers'] = tag.id;
            break;
            case 'category' :
            filters.categories.push(tag);
            if (tag.id==this.$route.query['categories']) this.selected['categories'] = tag.id;
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

      filtersChanged: function(){
        var _this = this;
        var query = JSON.parse(JSON.stringify(_this.$route.query || {}));
        Object.keys(  _this.selected  ).forEach(function(key, i) {
          let filter = parseInt(_this.selected[key]);
          if (filter !== 0) {
            query[key] = filter;
          }
          else {
            delete query[key];
          }
        });
        _this.$router.push({query: query});
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

    },

  }

</script>
