var apiCode = "f0b6e0e48ee2f2d5d637188c67551b91";
var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var apiForecast = "http://api.openweathermap.org/data/2.5/forecast?";
var apiCurrent ="https://api.openweathermap.org/data/2.5/weather?lat="

document.getElementById('button').onclick = async function() {
   var input =  document.getElementById("search").value;
   console.log(input);
   var location = await fetch(apiUrl+input+'&appid='+apiCode);
   var data = await location.json();
   console.log(data);

  console.log(data[0].lat);
  console.log(data[0].lon);

  var cityLon="&lon="+data[0].lon+"&appid=";
  var cityLat="lat="+data[0].lat;



  console.log(cityLat);
  console.log(cityLon);

  var fiveDay = await fetch(apiForecast+cityLat+cityLon+apiCode+"&units=imperial");
   console.log(fiveDay.json);
  var fiveData = await fiveDay.json();

  console.log(fiveData);
}
