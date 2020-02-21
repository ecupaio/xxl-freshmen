var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubePlayerAPIReady() {
  //video player
  player = new YT.Player('vid-player', {
    height: '480',
    width: '854',
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
        }, error: function(data) {
          console.log('error');
        }
      });
    }
    if (query.length < 2) {
      $('.search-result').remove();
    }
  });
  $('#search-toggle').click(function() {
    $('#search-overlay').addClass('active');
  });
  $('.close-search').click(function() {
    $('#search-overlay').removeClass('active');
  });
});
