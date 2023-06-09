// declares all of my api's and the different urls for them
var apiCode = "f0b6e0e48ee2f2d5d637188c67551b91";
var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
var apiForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=";
var apiCurrent = "https://api.openweathermap.org/data/2.5/weather?lat="
// points to the part on the HTML that I want to target with the var's
var displayResult = document.querySelector('#resultsArea');
var historyContainer = document.querySelector("#historyBtn")

var cityHistory = [];
// starts the history calling function
retrieveHistory()
// if there is no local history yet skips this step otherwise it pulls all the citys and starts making buttons for them
function retrieveHistory(){
  var storedHistory = JSON.parse(localStorage.getItem('History'));
  console.log(storedHistory)
    if(storedHistory !== null){
        cityHistory = storedHistory
    }
     historyContainer.innerHTML ="";
    for(var i =0; i <cityHistory.length;i++){
      var historyBtn = makeHistory(i);
      historyContainer.appendChild(historyBtn);
    }
    }

    function makeHistory(i) {
      var itemEl = document.createElement('div');
      itemEl.setAttribute('class', 'd-grid gap-2');
      var btnEl = document.createElement('button');
      btnEl.setAttribute('class', 'btn btn-primary');
      btnEl.textContent = cityHistory[i];
// if the button is clicked pulls the city and runs through the functions to genereate weather
      btnEl.addEventListener('click', function() {
        var clickedCity = cityHistory[i];
        handleHistoryClick(clickedCity);
      }); 
      itemEl.append(btnEl);
      return itemEl;
    }
    function handleHistoryClick(city) {
      console.log('Clicked city:', city);
      var locationGet = apiUrl + city + '&appid=' + apiCode;
      getLocation(locationGet);
    }
    
// if the search button is clicked takes the input and starts the functions to genereate the weather
document.getElementById('currentButton').onclick =function(){
  var input = document.getElementById("search").value;
  var locationGet = apiUrl+input+'&appid='+apiCode;
  getLocation(locationGet);
  cityHistory.push(input);
  console.log(cityHistory);
  localStorage.setItem("History",JSON.stringify(cityHistory))
  retrieveHistory()
}
document.getElementById('clearHistory').onclick =function(){
localStorage.clear();
location.reload();
}

//gets the lat and lon from the city name
function getLocation(city){
  fetch(city)
  .then(function(res){
    if(!res.ok){throw new Error('Oh no!')}
    return res.json();
  })
  .then(function(data){
    console.log(data);
    getCurrent(data);
    getForecast(data);
  })
  .catch(function(error){
    console.log(error);
  })
}
// pulls the current weather using the lat and lon data
function getCurrent(current){
  var cityLon = current[0].lon;
    console.log(cityLon);
  var cityLat = current[0].lat;
    console.log(cityLat);
  var url = apiCurrent+cityLat+"&lon="+cityLon+"&appid="+apiCode+"&units=imperial"
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
//pulls the forecast using the lat and lon data
function getForecast(forecast){
  var cityLon = forecast[0].lon;
    console.log(cityLon);
  var cityLat = forecast[0].lat;
    console.log(cityLat);
    var url = apiForecast+cityLat+"&lon="+cityLon+"&appid="+apiCode+"&units=imperial"
    fetch(url)
  .then(function(res){
    if(!res.ok){throw new Error('Oh no!')}
    return res.json();
  })
  .then(function(dataForecast){
    console.log(dataForecast);
    displayForecast(dataForecast)
  })
  .catch(function(error){
    console.log(error);
  })
}

function displayCurrent(cast){
  var weather3h = createCurrent(cast);
  displayResult.appendChild(weather3h);
}
//cycles through the forecast 5 times to generate 5 days worth of data
function displayForecast(cast){
    for(var i = 1;i < 40 + 1;i += 8){
    var fiveDay = createFiveDay(cast.list[i]);
    displayResult.appendChild(fiveDay);
    }
}
//function to make and display the current weather
function createCurrent(cast){
  displayResult.innerHTML = "";
  var display = document.createElement('div');
  var date = document.createElement('p')
  var title = document.createElement('h2');
  var temp = document.createElement('p');
  var wind = document.createElement('p');
  var humid = document.createElement('p');
  var icon = document.createElement('img')
  display.classList.add("col-12","gray");
  date.textContent = "Currently"
  title.textContent = cast.name;
  temp.textContent = "Temperature: "+ cast.main.temp + " °F"
  wind.textContent = "Wind Speed: "+ cast.wind.speed + " MPH"
  humid.textContent = "Humidity: "+ cast.main.humidity + "%"
  title.append(date)
  console.log(cast.weather[0].main)
//if statements for which icon to display
  if (cast.weather[0].main == "Clouds"){
    icon.src="./assets/images/coudyIcon.png"
    icon.style.width = "50px";
    icon.style.height = "50px";
  }
  if (cast.weather[0].main == "Rain"){
    icon.src="./assets/images/rainyIcon.png"
    icon.style.width = "50px";
    icon.style.height = "50px";
  }
  if (cast.weather[0].main == "Clear"){
    icon.src="./assets/images/sunnyIcon.png"
    icon.style.width = "50px";
    icon.style.height = "50px"; 
  }
  display.append(title,icon,temp,wind,humid);
  return display;
}
//function to make and display the forecast
function createFiveDay(cast){
  var display = document.createElement('div');
  var date = document.createElement('p')
  var title = document.createElement('h2');
  var temp = document.createElement('p');
  var wind = document.createElement('p');
  var humid = document.createElement('p');
  var icon = document.createElement('img')
  display.classList.add("col-2","inline","gray");
  date.textContent = cast.dt_txt
  temp.textContent = "Temperature: "+ cast.main.temp + " °F"
  wind.textContent = "Wind Speed: "+ cast.wind.speed + " MPH"
  humid.textContent = "Humidity: "+ cast.main.humidity + "%"
  title.append(date)
  
  //if statements for which icon to display
  if (cast.weather[0].main == "Clouds"){
    icon.src="./assets/images/coudyIcon.png"
    icon.style.width = "50px";
    icon.style.height = "50px";
  }
  if (cast.weather[0].main == "Rain"){
    icon.src="./assets/images/rainyIcon.png"
    icon.style.width = "50px";
    icon.style.height = "50px";
  }
  if (cast.weather[0].main == "Clear"){
    icon.src="./assets/images/sunnyIcon.png"
    icon.style.width = "50px";
    icon.style.height = "50px"; 
  }
  display.append(title,icon,temp,wind,humid);
return display
}
