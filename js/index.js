import { requestWeatherDays } from './shared/api.js';
const searchElement = document.querySelector("#input");
const nowCityElement = document.querySelector("#now-city");
let str = searchElement.value;
console.log(searchElement.value);
document.querySelector("#search-city").addEventListener("click", handleFetchWeather);
var location = str.split(".");
function handleFetchWeather() {
    console.log(location);
    nowCityElement.innerHTML = str;
    let data = requestWeatherDays(location[0], location[1]);
    console.log(data);
}