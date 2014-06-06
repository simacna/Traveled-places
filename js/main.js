function initialize() {

  // Set map options to center on NYC
  var mapOptions = {
    center: new google.maps.LatLng(40.7590615, -73.969231,12),
    zoom: 2
  };

  // Create a new map and bind it to #map-canvas
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

  // Set Instagram client_id
  var clientId = 'ec4d7008d30749028591badfc1dedfb5';
  var access_parameters = {client_id: clientId};

  // Makes an HTTP request to the Instagram API recent media 
  grabImages = function(access_parameters) {  

    // URL is hard-coded for one user
    var instagramUrl = 'https://api.instagram.com/v1/users/17438650/media/recent/?callback=?';

    // Make the HTTP request and then call onDataLoaded
    $.getJSON(instagramUrl, access_parameters, onDataLoaded);
  }

  // Runs when we get a response from Instagram and adds all the images with location information to the map
  onDataLoaded = function(instagram_data) {  

    // If the HTTP response code is 200 OK
    if(instagram_data.meta.code == 200 ) {

      var photos = instagram_data.data;

      // If the array of user's photos isn't empty
      if(photos.length > 0) {

        // Iterate over the array of user's photos
        for (var i in photos ){

          // Create a new img element with the src of the photo
          var photo = $("<img>").attr("src", photos[i].images.low_resolution.url)

          // Append the img to the DOM
          $('#target').append(photo);

          // Set the individual photo to a variable
          var photo = photos[i];

          // If the photo has a location property, we will create a new custom marker and bind it to the map
          if(photo.location) {

            // Create a new object literal to store the photo's properties
            var image = {
                url: photos[i].images.thumbnail.url,
                size: new google.maps.Size(50, 50),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(25, 25),
                scaledSize: new google.maps.Size(50, 50)
              };

            // Stores the photo's lat/long
            var myLatLng = new google.maps.LatLng(photo.location.latitude, photo.location.longitude);

            // Create the new marker and bind it to the map
            var customMarker = new google.maps.Marker({
                  position: myLatLng,
                  map: map,
                  icon: image
              });

            // When an image is clicked, zoom in on the photo
            (function (customMarker) {

              google.maps.event.addListener(customMarker, 'click', function() {
                  map.setZoom(map.getZoom() * 2);
                  map.setCenter(customMarker.getPosition());
                });

            })(customMarker);
            
          }

        }
      } else {
        // Display error if no photos in the array
        $('#target').append("Hmm...I couldn't find anything!");
      }
    } else {
      // Display error if the HTTP response code is not 200 OK
      var error = instagram_data.meta.error_message;
      $('#target').append("Something happened! Instagram says: " + error);
    }

    if(instagram_data.pagination.next_max_id != undefined) {

      var instagramUrl = 'https://api.instagram.com/v1/users/17438650/media/recent/?callback=?&max_id=' + instagram_data.pagination.next_max_id;

      $.getJSON(instagramUrl, access_parameters, onDataLoaded);
    }
  }

  // Call the grabImages function to start the whole process
  grabImages(access_parameters);
}

google.maps.event.addDomListener(window, 'load', initialize);