var apiCode = "f0b6e0e48ee2f2d5d637188c67551b91";
var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var apiForecast = "http://api.openweathermap.org/data/2.5/forecast?";
var apiCurrent ="https://api.openweathermap.org/data/2.5/weather?"
var displayResult = document.querySelector('#resultsArea');

document.getElementById('currentButton').onclick =function(){
  //var input = document.getElementById("search").value;
  input = "Dallas";
  var locationGet = apiUrl+input+'&appid='+apiCode;
  getLocation(locationGet);
}

function getLocation(city){
  fetch(city)
  .then(function(res){
    if(!res.ok){throw new Error('Oh no!')}
    return res.json();
  })
  .then(function(data){
    console.log(data);
    getCurrent(data);
  })
  .catch(function(error){
    console.log(error);
  })
}

function getCurrent(current){
  var cityLon = current[0].lon;
    console.log(cityLon);
  var cityLat = current[0].lat;
    console.log(cityLat);
  var url = apiForecast+"lat="+cityLat+"&lon="+cityLon+"&appid="+apiCode+"&units=imperial"
  fetch(url)
  .then(function(res){
    if(!res.ok){throw new Error('Oh no!')}
    return res.json();
  })
  .then(function(dataCurrent){
    console.log(dataCurrent);
    displayCurrent(dataCurrent)
  })
  .catch(function(error){
    console.log(error);
  })
}

function createCurrent(cast){
  displayResult.innerHTML = '';
  var display = document.createElement('div');
  display.classList.add("col-12");
  var date = document.createElement('p')
  date.textContent =" "+ cast.list[0].dt_txt
  var title = document.createElement('h2');
  title.textContent = cast.city.name;
  var temp = document.createElement('p');
  temp.textContent = 'Temperature: '+ cast.list[0].main.temp + ' °F'
  var wind = document.createElement('p');
  wind.textContent = 'Wind Speed: '+ cast.list[0].wind.speed + ' MPH'
  var humid = document.createElement('p');
  humid.textContent = 'Humidity: '+ cast.list[0].main.humidity + '%'
  title.append(date)
  display.append(title,temp,wind,humid);
  return display;
}

function displayCurrent(cast){
  var weather3h = createCurrent(cast);
  displayResult.appendChild(weather3h);
}