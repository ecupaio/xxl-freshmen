var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubePlayerAPIReady() {
  var vidWidth;
  var vidHeight;
  if ($(window).width() < 568) {
    vidWidth = 330;
    vidHeight = 185;
  } else {
    vidWidth = 854;
    vidHeight = 480;
  }
  //video player
  player = new YT.Player('vid-player', {
    height: vidHeight,
    width: vidWidth,
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
function playVid() {
  $('.vid-link').click(function() {
    var vidId = $(this).data('vid');
    player.loadVideoById(vidId);
    $('.vid-overlay').addClass('active');
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
  $('.enlarge-vid').click(function() {
    $('.vid-overlay').removeClass('min');
  });
}
$(function() {
  $(window).scroll(function() {
    if ($('.vid-overlay').hasClass('active')) {
      $('.vid-overlay').addClass('min');
    }
  });

  // var sjs = SimpleJekyllSearch({
  //     searchInput: document.getElementById('search-input'),
  //     resultsContainer: document.getElementById('results-container'),
  //     json: '/search.json',
  //     searchResultTemplate: searchResult,
  //     templateMiddleware: refineResults()
  // });
  function refineResults() {
    $('.search-result').each(function() {
      $(this).find('.freestyle[data-vid="{freestyle}"]').addClass('hidden');
    });
    console.log('success');
  }
  //site search
  $('#search-form').submit(function(e) {
    e.preventDefault();
  });
  $('#search-form .search-input-box').on('input',function(e) {
    e.preventDefault();
    var query = $('#search-input').val().toLowerCase();
    if (query.length >= 2) {
      //sjs.search(query);
      $.ajax({
        url: '/search.json',
        success: function(data) {
          $('.search-result').remove();
          $.each(data, function(i,obj) {
            var artist = obj.artist;
            var artistLc = obj.artist.toLowerCase();
            var freestyle = obj.freestyle;
            var cypher = obj.cypher;
            var searchResult = '<div class="search-result" data-artist="'+artist+'">'+
                                  '<h3>'+artist+'</h3>'+
                                  '<div class="artist-img">'+

                                  '</div>'+
                                  '<div class="result-videos">'+

                                  '</div>'+
                               '</div>';
            if (artistLc.indexOf(query) > -1) {
              if ($('.search-result[data-artist="'+artist+'"]').length < 1) {
                $('#results-container').append(searchResult);
                if (freestyle.length > 0) {
                  $('.search-result[data-artist="'+artist+'"] .artist-img').append('<img src="https://img.youtube.com/vi/'+freestyle+'/mqdefault.jpg" class="artist-thumb" alt="">');
                  $('.search-result[data-artist="'+artist+'"] .result-videos').append('<div class="vid-link freestyle" data-vid="'+freestyle+'">Freestyle</div>');
                  playVid();
                } else {
                  $('.search-result[data-artist="'+artist+'"] .artist-img').append('<img src="https://img.youtube.com/vi/'+cypher+'/mqdefault.jpg" class="artist-thumb" alt="">');
                }
                if (cypher.length > 0) {
                  $('.search-result[data-artist="'+artist+'"] .result-videos').append('<div class="vid-link" data-vid="'+cypher+'">Cypher</div>');
                  playVid();
                }
              }

            } else {

            }
          });
          console.log($('.search-result').length);

        }, error: function(data) {
          console.log('error');
        }
      });
    }
    if (query.length < 2) {
      $('.search-result').remove();
    }
    if ($('.search-result').length > 0) {
      $('#results-container').removeClass('hidden');
    } else {
      $('#results-container').addClass('hidden');
    }

  });
  $('#search-toggle').click(function() {
    $('#search-overlay').addClass('active');
  });
  $('.close-search').click(function() {
    $('#search-overlay').removeClass('active');
  });

  //nav
  $(window).on('scroll', function() {
    var scrollTop = $(this).scrollTop();
    $('.year').each(function() {
      var topDistance = $(this).offset().top;
      if ((topDistance+20) < scrollTop ) {
        var currentYear = $(this).data('year');
        $('.year-text').text(currentYear);
      }
    });
    if ($('.year:eq(0)').offset().top + 100 < scrollTop ) {
      $('#sticky-nav').addClass('active');
    } else {
      $('#sticky-nav').removeClass('active');
    }
  });
  $('.display-year').click(function() {
    $(this).toggleClass('active');
    $('.nav-year-list').slideToggle();
  });
  $('.nav-year a').click(function(e) {
    e.preventDefault();
    var selectedYear = $(this).attr('href');
    $('body,html').animate({
        scrollTop: $(selectedYear).offset().top + 31
    }, 500);
  });

  //FB share
  var siteUrl = "https://ecupaio.github.io/xxl-freshmen/";
  $('.share-btn.facebook').click(function() {
    FB.ui({
      method: 'share',
      display: 'popup',
      href: siteUrl,
    }, function(response){});
  });

});
