
<template>

  <div id="history">
    <div id="history-button">
      <a id='history-open' href="#" v-on:click.prevent="open">history browse</a>
    </div>

    <aside id="history-driver" class='closed test'>
      <h2>History</h2>
      <article v-for="article in articles">
        <router-link :to="{name: 'Article', params: {id: article.id}}">
          <h4>{{article.title}}</h4>
          {{setDataImg(article)}} <!-- opens posibility for asinc image (e.g. kaltura poster cover) -->
          <div class="img-w">
            <img :src=article.img alt='' />
          </div>
        </router-link>
      </article>
      <a id="history-close" href="#" v-on:click.prevent="close">
        <svg viewBox="0 0 40 40">
          <path stroke="black" stroke-width="2" d="M 0,0 L 40,40 M 40,0 L 0,40" />
        </svg>
      </a>
    </aside>
  </div>

</template>


<style lang="scss" scoped>

@import "../../assets/sass/app.scss";

#history-button {
  @include device(mobile) {
    display: none;
  }
  @include gutter;
  float: right;
  width: auto;
  position: relative;
  #history-open {
    position: absolute;
    right: 0;
    top: 3rem;
    width: 160px;
    max-width: 10vw;
    padding: 0 .25em;

    height: 2.5rem;
    line-height: 2.5rem;
    vertical-align: sub;
    text-align: center;
    border: 1px solid gray;
    text-decoration: none;
    font-family: $sans;
    font-size: 1rem;
    color: gray;
    font-weight: 400;
    overflow: hidden;
  }
}

#history-driver {
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 33%;
  max-width: 450px;
  z-index: 10;
  background-color: white;
  outline: 1px solid red;
  margin: 1px;
  overflow: auto;
  transition: all .4s;
  &.closed {
    right: -100%;
  }
  #history-close {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    padding: 18px;


    svg {
      width: 100%;
      height: 100%;
      path {
        stroke-width: 5;
      }
    }
  }
  h2 {
    font-size: 2.2rem;
    text-align: center;
    margin: 0;
    padding: 3rem;

  }
  article {
    width: 52%;
    margin: 0 24%;
    padding-top: 5rem;
    //height: 16rem;
    a {
      text-decoration: none;
      color: gray;
    }
    h4 {
      text-align: center;
      font-family: $sans;
      margin: 0 0 .6rem;
      font-weight: 300;
      font-size: 1.2rem;
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
  }
}

</style>




<script>

export default {

  created() {
    window.__history = this;
    var _this = this;
    _this.$router.afterHooks.push(function(newRoute, prevRoute){
      if (newRoute.name === "Article") {
        var id = newRoute.params.id;
        _this.historyAdd(id);
      }
    });
  },

  activated() {
    var _this = this;
    if (!_this.historyExist) {
      _this.articles = [];
      return; // history is empty
    }
    var url = "http://192.168.0.111:1010/api/articles?ids=" + _this.history.toString();
    if (url === _this.lastUrl) {
      return; // cache due to no history change
    }
    _this.lastUrl = url;
    this.$http.get(url).then(function(response){
      _this.articles = response.data;
    });
  },

  data () {
    return {
      articles: [],
      lastUrl: ""
    }
  },

  computed: {

    historyExist: {
      cache: false,
      get() {
        return !!this.history.length;
      }
    },

    history: {
      cache: false, // !!! FCK
      set: function(history) {
        localStorage.setItem("browserHistory", JSON.stringify(history));
      },
      get: function() {
        return JSON.parse(localStorage.getItem("browserHistory") || "[]")
      },
    },

  },

  props: [
    'id',
  ],

  methods: {
    historyAdd(id){
      var _this = this;
      var _history = _this.history.slice(0);
      var position = _history.indexOf(id);
      if (position !== -1) {
        _history.splice(position, 1);
      }
      _history.unshift(id);
      _this.history = _history;
    },
    open(){

      document.getElementById('history-driver').classList.remove('closed')
    },
    close(){
      document.getElementById('history-driver').classList.add('closed')
    }
  }

}

</script>
