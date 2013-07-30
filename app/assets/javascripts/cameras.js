
function initialize() {

  // create the map
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(51.512769700000000000,-0.128924099999949250),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

//now get the cameras array from the server using JSON
//see how we serve up the JSON object in the rails cameras controller
  var cameras;
  $.getJSON('/cameras.json', function(data){
    // everything you do with the JSON object happens inside this function
    cameras = data

    //loop through my cameras array creating a marker for each one.
    for(var i =0; i < cameras.length; i++){

      //each marker needs to have a unique id so we can match it to the info window later
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(cameras[i].lat), parseFloat(cameras[i].lng)),
        map: map,
        title: 'placeholder',
        camera_id: i,
        location: cameras[i].location,
        postcode: cameras[i].postcode,
        file: cameras[i].file
      })

      //create an event to happen on clicking a marker
      google.maps.event.addListener(marker, 'click', function() {
        // this next line is for scoping purposes for line 47.
        var self = this
        //write a content string for the marker we are currently iterating...
        var contentString = '<div id="content"><img src="http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/' + marker.file + '"><p>' + marker.location + ", " + marker.postcode + '</p></div>';

        //... and use this string to create a new content window for this marker
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        //finally, define what happens when we click the marker
        infowindow.open(map, self)

      });  //closes the goolge maps listener event
    } // closes the for loop
  }) //closes the getJSON
} //closes document ready

google.maps.event.addDomListener(window, 'load', initialize);
