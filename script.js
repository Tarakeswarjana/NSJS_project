













function haversineDistance(mk1, mk2) {
  var rad = 6371.0710; // Radius of the Earth in kms
  var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * rad * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}


var map;
function initMap() {

//.....................................................input filed....................
var select = document.getElementById('origin');
var origin=select.options[select.selectedIndex].value;
// en

var select1 = document.getElementById('destinetion');
var destinetion=select.options[select1.selectedIndex].value;


var jsonStr = origin.replace(/(\w+:)|(\w+ :)/g, function(s) {
return '"' + s.substring(0, s.length-1) + '":';
});

point1 = JSON.parse(jsonStr);


var jsonStr2 = destinetion.replace(/(\w+:)|(\w+ :)/g, function(s) {
return '"' + s.substring(0, s.length-1) + '":';
});

point2 = JSON.parse(jsonStr2);

console.log(point1.lat);
console.log(point2.lng);



  // The map, centered on India
  const center = {lat: 21.7679, lng: 78.8718};
  const options = {zoom: 5, scaleControl: true, center: center};
  var map = new google.maps.Map(
      document.getElementById('map'), options);
  // Locations of landmarks
   // point1 = {lat: 30.5, lng: 75.5};
  // point2 = {lat: 21.7679, lng: 78.8718};

  
  // The markers for The point1 and The point2 Collection
   mk1 = new google.maps.Marker({position: point1, map: map});
   mk2 = new google.maps.Marker({position: point2, map: map});
   var line = new google.maps.Polyline({path: [point1, point2], map: map});
   var distance = haversineDistance(mk1, mk2);
document.getElementById('msg').innerHTML = "Distance between two points: " + distance.toFixed(2) + " Kms.";

function money(dist){
if(dist<10){price=dist*5;
return price;}
if(dist<20){
  price=10*5+(dist-10)*2;
  return price;
}
if(dist>20){
  price=10*5+10*2+(dist-20)*1;
  return price;
}

}
var rupi= money(distance);
document.getElementById('price').innerHTML="Fair price for travel:"+rupi+"rupees";

  }

var batton= document.getElementById("btn");
batton.addEventListener('click',initMap());


