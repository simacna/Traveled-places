function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(40.7590615, -73.969231,12),
    zoom: 2
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

  var image = {
      url: "http://scontent-b.cdninstagram.com/hphotos-xfp1/t51.2885-15/10362225_646900952063007_1845591211_a.jpg",
      size: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(25, 25),
      scaledSize: new google.maps.Size(50, 50)
    };

  var myLatLng = new google.maps.LatLng(40.764641, -73.994225);

  var customMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });

  google.maps.event.addListener(customMarker, 'click', function() {
      map.setZoom(16);
      map.setCenter(customMarker.getPosition());
    });
}
google.maps.event.addDomListener(window, 'load', initialize);