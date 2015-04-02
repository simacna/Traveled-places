function initialize() {
  $.ajax({
      url: 'http://localhost:3000/photos',
      type: 'GET'
   }).done(function(data) {
      console.log(data);
      onDataLoaded(data);
  });

  var mapOptions = {
    center: new google.maps.LatLng(40.7590615, -73.969231,12),
    zoom: 4
  };


//Create map and add to "map-canvas" div
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

 
//Instagram user ID

// // session[:access_token]

//   var clientId = '';
//   var access_parameters = {client_id: clientId};

//   // Makes an HTTP request to the Instagram API recent media 
//   grabImages = function(access_parameters) {  

//     // URL is hard-coded for one user
//     var instagramUrl = 'https://api.instagram.com/v1/users/17438650/media/recent/?callback=?';

//     // Make the HTTP request and then call onDataLoaded
//     $.getJSON(instagramUrl, access_parameters, onDataLoaded);
//   }


	// Runs when we get a response from Instagram
  onDataLoaded = function(instagram_data) {  

    var photos = instagram_data;
			
	 //  var append_image = $("<img>").attr('src', photos[0].images.thumbnail.url);
	
		// $('#info-left').append(append_image);


    // If the array of user's data isn't empty
    if(photos.length > 0) {

      // Iterate over the array of user's photos
      for (var i in photos ){
				 
        //Individual data for each iteradated photo
				var photo = photos[i]
        console.log(photo);
				
			
				//if photo does have property = location
				

        	
					var image = {
			      url: photos[i].image_url,
			      size: new google.maps.Size(50, 50),
			      origin: new google.maps.Point(0,0),
			      anchor: new google.maps.Point(25, 25),
			      scaledSize: new google.maps.Size(50, 50)
			    };

			    var myLatLng = new google.maps.LatLng(photo.latitude, photo.longitude);

			    var customMarker = new google.maps.Marker({
			        position: myLatLng,
			        map: map,
			        icon: image
			    });

          
			
    			// (function(customMarker){
    			// 	google.maps.event.addListener(customMarker, 'mouseover',function(){
    			// 		map.setZoom(map.getZoom() + 1);
    			// 		map.setCenter(customMarker.getPosition());
    			// 	});
    			// })(customMarker);

       
      }
    } else {
      // Display error if no photos in the array
      $('#target').append("Hmm...I couldn't find anything!");
    }
  }

  // Call the grabImages function to start the whole process
  // grabImages(access_parameters);

}


$(document).ready(initialize);