import { requestWeatherDays } from './shared/api.js';
const searchElement = document.querySelector("#input");
const nowCityElement = document.querySelector("#now-city");
document.querySelector("#search-city").addEventListener("click", handleFetchWeather);
async function handleFetchWeather() {
    let str = searchElement.value;
    let location = str.split(" ");
    nowCityElement.innerHTML = str;
    let days = requestWeatherDays(location[0], location[1]);

}