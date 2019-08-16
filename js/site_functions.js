var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubePlayerAPIReady() {
  //video player
  player = new YT.Player('vid-player', {
    height: '360',
    width: '640',

    host: 'https://www.youtube.com',
    playerVars: {
      controls: 1,
      rel: 0,
      autoplay: 1,
      showinfo: 0
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}
function onPlayerReady(event) {
  $('.close-vid').click(function() {
    $('.vid-overlay').removeClass('active min');
    player.stopVideo();
  });
  $('.vid-link').click(function() {
    var vidId = $(this).data('vid');
    player.loadVideoById(vidId);
    $('.vid-overlay').addClass('active');
  });
}
$(function() {

  $(window).scroll(function() {

    if ($('.vid-overlay').hasClass('active')) {
      $('.vid-overlay').addClass('min');
    }
  });

});
