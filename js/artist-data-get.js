$(function(){
  var sheetID = "1zd7Hg5FpmzwAigm699KMC0dbETxCY8cEHev2XxRNF58";
  var apiKey = "AIzaSyAdQED4n41OGr3U_Yxed9rT9y4gqx0VVGQ";
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  $.ajax({
    url: 'https://sheets.googleapis.com/v4/spreadsheets/'+sheetID+'/values/A2:F1000?key='+apiKey+'&majorDimension=ROWS',
    type: 'GET',
    success: function (data) {
      var values = data.values;
      var artists = [];
      var years = [];
      var cyphers = [];
      //create arrays
      $.each(values, function(i) {
        var artist = values[i][0];
        var year = values[i][1];
        var freestyle = values[i][2];
        var cypher = values[i][3];
        var artistObj = {
          "name":artist,
          "year":year,
          "freestyle": freestyle,
          "cypher": cypher
        };
        if (cypher !== undefined) {
          cyphers.push({"cypher": cypher,"year": year});
        }
        artists.push(artistObj);
        years.push(year);

      });
      console.log(cyphers);
      var uniqueYears = years.filter(onlyUnique);
      $.each(uniqueYears,function(i) {
        var yearBlock = '<div class="year" data-year='+uniqueYears[i]+'>'+
                          '<div class="year-title">'+uniqueYears[i]+'</div>'+
                          '<div class="year-content">'+
                            '<div class="content-section">'+
                              '<h3>Cyphers</h3>'+
                              '<div class="vid-container cyphers"></div>'+
                            '</div>'+
                            '<div class="vid-container artists">'+
                              '<h3>'+
                            '</div>'+
                          '</div>'+
                        '</div>';
        $('#years .inner-section').append(yearBlock);

      });
      $.each(cyphers,function(i) {
        var cypherYear = cyphers[i].year;
        var cypherID = cyphers[i].cypher;
        var cypherBlock = '<div class="cypher" data-cypher='+cypherID+'>'+
                            '<div>'+cypherID+'</div>'+
                            '<div class="cypher-artists"></div>'+
                          '</div>';
        if ($('[data-cypher='+cypherID+']').length < 1) {
          $('[data-year="'+cypherYear+'"] .cyphers').append(cypherBlock);
        }

      });

      $.each(artists, function(i) {
        var artistName = artists[i].name;
        var artistYear = artists[i].year;
        var artistFreestyle = artists[i].freestyle;
        var artistCypher =  artists[i].cypher;
        $('[data-year='+artistYear+'] .artists').append('<div>'+artistName+'</div>');
        $('[data-cypher='+artistCypher+'] .cypher-artists').append('<span class="cypher-artist">'+artistName+'</span>');
      });

    },
    error: function (data) {

    },
  });
});
