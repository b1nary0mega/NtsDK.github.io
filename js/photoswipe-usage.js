// build items array

var cyberCityItems = [
        {
            src: 'http://cs630917.vk.me/v630917695/e024/7uAM1-XDmj4.jpg',
            w: 1280,
            h: 720
        },        
        {
            src: 'http://cs630917.vk.me/v630917695/e02d/pfWmUMpKo80.jpg',
            w: 1280,
            h: 720
        },        
        {
            src: 'http://cs630917.vk.me/v630917695/e036/fqtYioXreQo.jpg',
            w: 1280,
            h: 720
        },        
        {
            src: 'http://cs630917.vk.me/v630917695/e03f/lAlfJoB4lbg.jpg',
            w: 1280,
            h: 720
        },
];
        
var arkhamItems = [
        {
            src: 'http://cs630917.vk.me/v630917695/dade/eWzfGe-Nb9k.jpg',
            w: 622,
            h: 860
        },
        {
            src: 'http://cs630917.vk.me/v630917695/daf0/-MtQM3atawE.jpg',
            w: 624,
            h: 860
        },
        {
            src: 'http://cs630917.vk.me/v630917695/dacc/-mBQHO3yxBI.jpg',
            w: 620,
            h: 859
        },
        {
            src: 'http://cs630917.vk.me/v630917695/daba/nFn_FqmT1VU.jpg',
            w: 625,
            h: 859
        },
        {
            src: 'http://cs630917.vk.me/v630917695/dad5/gCMXWcSpd9k.jpg',
            w: 623,
            h: 859
        },
        {
            src: 'http://cs630917.vk.me/v630917695/dae7/JAaXqPRz_t8.jpg',
            w: 622,
            h: 859
        },
        {
            src: 'http://cs630917.vk.me/v630917695/dac3/bSI3xsOaQ-w.jpg',
            w: 623,
            h: 861
        },
];

function showGallery(items){
  var pswpElement = document.querySelectorAll('.pswp')[0];
  
  // define options (if needed)
  var options = {
      // optionName: 'option value'
      // for example:
      index: 0, // start at first slide,
      shareEl: false
  };

  // Initializes and opens PhotoSwipe
  var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();
};

document.getElementById("arkhamGallery").addEventListener("click", function(){
  showGallery(arkhamItems);
});

document.getElementById("cyberCityGallery").addEventListener("click", function(){
  showGallery(cyberCityItems);
});



