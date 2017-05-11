var APPID = "f6440f12840ffb6b247ce09defc948ef";
var temp;
var loc;
var icon;
var humidity;
var wind;
var description;

function updateByZip(zip){
	var url = "http://api.openweathermap.org/data/2.5/weather?" +
		"zip=" + zip +
		"&APPID=" + APPID;
	sendRequest(url);
}

function updateBySearch(searchValue){
	var url = "http://api.openweathermap.org/data/2.5/weather?" +
		"q=" + searchValue +
		"&APPID=" + APPID;
	sendRequest(url);
}

function updateByGeo(lat, lon){
	var url = "http://api.openweathermap.org/data/2.5/weather?" +
		"lat=" + lat +
		"&lon=" + lon +
		"&APPID=" + APPID;
	sendRequest(url);
	
}

function sendRequest(url){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var data = JSON.parse(xmlhttp.responseText);
//            console.log(data.weather[0].description );
			var weather = {};
			weather.icon = data.weather[0].id;
			weather.humidity = data.main.humidity;
			weather.wind = data.wind.speed;
			weather.description = data.weather.main;
			weather.loc = data.name;
			weather.temp = K2C(data.main.temp);
            weather.description = data.weather[0].description;
			update(weather);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function K2C(k){
	return Math.round(k - 273.15);
}




function update(weather){
	wind.innerHTML = weather.wind;
	humidity.innerHTML = weather.humidity;
	loc.innerHTML = weather.loc;
	temp.innerHTML = weather.temp;
	description.innerHTML = weather.description;
	icon.src = "imgs/code/" + weather.icon + ".svg";
	
}

function showPosition(position){
	updateByGeo(position.coords.latitude, position.coords.longitude);
}

window.onload = function () {
	
	temp = document.getElementById("tempreture");
	loc = document.getElementById("location");
	icon = document.getElementById("icon");
	humidity = document.getElementById("humidity");
	wind = document.getElementById("wind");
	description = document.getElementById("description");
    
    var searchInput = document.getElementById("search_location");
    var searchForm = document.getElementById("my_form");
    searchInput.addEventListener("change", function(){
        updateBySearch(this.value);
    }, false);
    searchForm.addEventListener("submit", function(e){
        e.preventDefault();
        updateBySearch(searchInput.value);
    }, false);
	
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPosition);
		
		
	} else {
		var zip = window.prompt("Could not discover your location. What is your zip code?");
		updateByZip(zip);
	}
	
}
