$(document).ready(function() {
  var tag = "kitty";
  var count = 4;
  var clientId = 'ec4d7008d30749028591badfc1dedfb5';
  var access_parameters = {client_id: clientId};

  grabImages = function(access_parameters) {  

    var instagramUrl = 'https://api.instagram.com/v1/users/17438650/media/recent/?callback=?';

    $.getJSON(instagramUrl, access_parameters, onDataLoaded);
  }

  onDataLoaded = function(instagram_data) {  
    if(instagram_data.meta.code == 200) {

      var photos = instagram_data.data;

      if(photos.length > 0) {

        for (var key in photos ){

          var photo = photos[key];

          var image = $("<img>").attr("src", photo.images.low_resolution.url)

          // photo.location.latitude
          // photo.location.longitude

          $('#target').append(image);
        }
      } else {
        $('#target').append("Hmm.  I couldn't find anything!");
      }
    } else {
      var error = instagram_data.meta.error_message;
      $('#target').append("Something happened, Instagram said: " + error);
    }
  }

  grabImages(access_parameters);

});