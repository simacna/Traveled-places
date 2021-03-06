function initialize() {
  $.ajax({
      url: 'http://localhost:3000/photos',
      type: 'GET'
   }).done(function(data) {
      console.log(data);
      console.log("The below is onDataLoaded(data)");
      onDataLoaded(data);
  });



  var mapOptions = {
    center: new google.maps.LatLng(40.7590615, -99.969231,12),
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

  // Previously the variable onDataLoaded was used -- I wasn't sure if this was a js term or a variable; it seems
  //that it's merely a variable and functions declared this way automatically get called 
  // onDataLoaded = 
  onDataLoaded = function(instagram_data) {  



    var photos = instagram_data;
    console.log(photos);
    
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
			      size: new google.maps.Size(100, 100),
			      origin: new google.maps.Point(0,0),
			      anchor: new google.maps.Point(25, 25),
			      scaledSize: new google.maps.Size(70, 70)
			    };

          console.log("below is image object being printed");
          console.log(image.size);

			    var myLatLng = new google.maps.LatLng(photo.latitude, photo.longitude); //going to comment this out and place into the 
          //var image object literal to see the effects

          //Below is declaring each custom marker 
			    var customMarker = new google.maps.Marker({
			        position: myLatLng,
			        map: map,
			        icon: image

			    });

           //Will set zoom, increment, once hit 3 zooms change picture size to large image
          var zoom = 0;
			
    			(function(customMarker){
    				google.maps.event.addListener(customMarker, 'click',function(){

              if(zoom < 8){
                console.log(customMarker.position); //trying to print on console to figure out how to access image.scaledSize
                //in order to access each images scaledSize/zoomed property 
                //there seems to be a different when the variable is ex. scaledSize: new google.maps.size vs var customMarker, hm
                zoom += 1;
                map.setZoom(map.getZoom() + 1);
                map.setCenter(customMarker.getPosition());
                animation: google.maps.Animation.DROP;
               } else {
                  // size: new google.maps.Size(70, 70);
                // //still can't make image to be large after zoom is no longer smaller than 3
                  // image.scaledSize: new google.maps.Size(150,150);
                };
                 		
              		});
    			})(customMarker);

       
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

 //put function in IFFY - let's see if it changes anything

