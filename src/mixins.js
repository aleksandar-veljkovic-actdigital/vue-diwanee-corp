export default {

  methods: {

    articleImages: function(article) {
      return article.elements.reduce(function(_imgs, element) {
        switch (element.type) {
          case 'diwanee_image' :
          _imgs.diwanee_image.push( element.data.file.url );
          break;
          case 'slider_image' :
          _imgs.slider_image.push( element.data.file.url );
          break;
          case 'video' :
          _imgs.video.push( element.data.remote_id );
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
      else article.img =  "http://via.placeholder.com/350x200";
    },

  },

};
