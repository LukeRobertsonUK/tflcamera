
function initialize() {

  // create the map
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(51.512769700000000000,-0.128924099999949250),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var infowindow = new google.maps.InfoWindow({
          content: ""
        });

//now get the cameras array from the server using JSON
//see how we serve up the JSON object in the rails cameras controller

  $.getJSON('/cameras.json', function(cameras){
    // everything you do with the JSON object happens inside this function
    //loop through my cameras array creating a marker for each one.
    for(var i =0; i < cameras.length; i++){

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(cameras[i].lat), parseFloat(cameras[i].lng)),
        map: map,
        title: cameras[i].location,
        location: cameras[i].location,
        postcode: cameras[i].postcode,
        file: cameras[i].file
      })

      //create an event to happen on clicking each marker
      google.maps.event.addListener(marker, 'click', function() {


        //write a content string for the marker we are currently iterating and add it to the info window we created earlier
        infowindow.content = '<div id="content"><img src="http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/' + this.file + '"><p>' + this.location + ", " + this.postcode + '</p></div>';



        //finally, define what happens when we click the marker
        infowindow.open(map, this)

      });  //closes the google maps listener event
    } // closes the for loop
  }) //closes the getJSON
} //closes initialize function

google.maps.event.addDomListener(window, 'load', initialize);
