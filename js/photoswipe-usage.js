// build items array

var nimsGallery = [
{src: 'images/nims/1_1_overview.jpg                  '.trim(), w: 1280, h: 1024},
{src: 'images/nims/1_2_diagrams.jpg                  '.trim(), w: 1280, h: 1024},
{src: 'images/nims/2_1_characterProfile.jpg          '.trim(), w: 1280, h: 1024},
{src: 'images/nims/2_2_characterFilter.jpg           '.trim(), w: 1280, h: 1024},
{src: 'images/nims/2_3_characterProfileConfigurer.jpg'.trim(), w: 1280, h: 1024},
{src: 'images/nims/3_1_masterStory.jpg               '.trim(), w: 1280, h: 1024},
{src: 'images/nims/3_2_storyEvents.jpg               '.trim(), w: 1280, h: 1024},
{src: 'images/nims/3_3_storyCharacters.jpg           '.trim(), w: 1280, h: 1024},
{src: 'images/nims/3_4_eventPresence.jpg             '.trim(), w: 1280, h: 1024},
{src: 'images/nims/4_events.jpg                      '.trim(), w: 1280, h: 1024},
{src: 'images/nims/5_1_briefingPreview.jpg           '.trim(), w: 1280, h: 1024},
{src: 'images/nims/5_2_1_standardExport.jpg          '.trim(), w: 1280, h: 1024},
{src: 'images/nims/5_2_2_customDocx.jpg              '.trim(), w: 1280, h: 1024},
{src: 'images/nims/5_2_3_customTxt.jpg               '.trim(), w: 1280, h: 1024},
{src: 'images/nims/6_timeline.jpg                    '.trim(), w: 1280, h: 1024},
{src: 'images/nims/7_socialNetwork.jpg               '.trim(), w: 1280, h: 1024},
{src: 'images/nims/8_adminTools.jpg                  '.trim(), w: 1280, h: 1024},
{src: 'images/nims/9_log.jpg                         '.trim(), w: 1280, h: 1024},
];

var pollsGallery = [ {
    src : 'images/polls-assistant/1.png',
    w : 1200,
    h : 594
}, {
    src : 'images/polls-assistant/2.png',
    w : 1200,
    h : 600
}, {
    src : 'images/polls-assistant/3.png',
    w : 1200,
    h : 583
}, {
    src : 'images/polls-assistant/4.png',
    w : 937,
    h : 569
}, {
    src : 'images/polls-assistant/5.png',
    w : 1200,
    h : 567
}, {
    src : 'images/polls-assistant/exp1.jpg',
    w : 415,
    h : 416
}, {
    src : 'images/polls-assistant/exp2.jpg',
    w : 418,
    h : 413
}, {
    src : 'images/polls-assistant/exp3.jpg',
    w : 579,
    h : 422
}, ];

var gamesGallery = [ {
    src : 'images/games/TPO.png',
    w : 611,
    h : 434
}, {
    src : 'images/games/InkMustFlow1.jpg',
    w : 1280,
    h : 795
}, {
    src : 'images/games/InkMustFlow2.jpg',
    w : 1280,
    h : 795
}, {
    src : 'images/games/UnstableWilly1.png',
    w : 611,
    h : 434
}, {
    src : 'images/games/UnstableWilly2.png',
    w : 611,
    h : 434
}, {
    src : 'images/games/UnstableWilly3.png',
    w : 282,
    h : 200
}, ];

var fcmItems = [ {
    src : 'images/FCMvsKMeans-big.jpg',
    w : 1046,
    h : 620
} ];

var cyberCityGallery = [ {
    src : 'http://cs630917.vk.me/v630917695/e024/7uAM1-XDmj4.jpg',
    w : 1280,
    h : 720
}, {
    src : 'http://cs630917.vk.me/v630917695/e02d/pfWmUMpKo80.jpg',
    w : 1280,
    h : 720
}, {
    src : 'http://cs630917.vk.me/v630917695/e036/fqtYioXreQo.jpg',
    w : 1280,
    h : 720
}, {
    src : 'http://cs630917.vk.me/v630917695/e03f/lAlfJoB4lbg.jpg',
    w : 1280,
    h : 720
}, ];
        

var arkhamGallery = [ {
    src : 'http://cs630917.vk.me/v630917695/dade/eWzfGe-Nb9k.jpg',
    w : 622,
    h : 860
}, {
    src : 'http://cs630917.vk.me/v630917695/daf0/-MtQM3atawE.jpg',
    w : 624,
    h : 860
}, {
    src : 'http://cs630917.vk.me/v630917695/dacc/-mBQHO3yxBI.jpg',
    w : 620,
    h : 859
}, {
    src : 'http://cs630917.vk.me/v630917695/daba/nFn_FqmT1VU.jpg',
    w : 625,
    h : 859
}, {
    src : 'http://cs630917.vk.me/v630917695/dad5/gCMXWcSpd9k.jpg',
    w : 623,
    h : 859
}, {
    src : 'http://cs630917.vk.me/v630917695/dae7/JAaXqPRz_t8.jpg',
    w : 622,
    h : 859
}, {
    src : 'http://cs630917.vk.me/v630917695/dac3/bSI3xsOaQ-w.jpg',
    w : 623,
    h : 861
}, ];

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

function makeListener(id, gallery){
    document.getElementById(id).addEventListener("click", function() {
        showGallery(gallery);
    });
}

makeListener("arkhamGallery", arkhamGallery);
makeListener("arkhamGallery-img", arkhamGallery);
makeListener("cyberCityGallery", cyberCityGallery);
makeListener("cyberCityGallery-img", cyberCityGallery);
makeListener("fcm-img", fcmItems);
makeListener("gamesGallery", gamesGallery);
makeListener("gamesGallery-img", gamesGallery);
makeListener("pollsGallery", pollsGallery);
makeListener("pollsGallery-img", pollsGallery);
makeListener("nimsGallery", nimsGallery);
makeListener("nimsGallery-img", nimsGallery);
