import { requestWeatherDays, requestWeatherHours } from './shared/api.js';
const searchElement = document.querySelector("#input");
const nowCityElement = document.querySelector("#now-city");
const nowTempElement = document.querySelector("#now-temp");
const nowWeatherElement = document.querySelector("#now-weather");
document.querySelector("#search-city").addEventListener("click", handleFetchWeather);
async function handleFetchWeather() {
    const str = searchElement.value;
    const location = str.split(" ");
    console.log(location[0],location[1]);
    nowCityElement.innerHTML = str;
    const daysData = await requestWeatherDays(location[0], location[1]);
    if(!daysData.data.forecast_24h["0"]){
        alert("错误的城市");
        return;
    }
    console.log(daysData);
    const hoursData = await requestWeatherHours(location[0],location[1]);
    console.log(hoursData);
    nowTempElement.innerHTML = hoursData.data.forecast_1h["0"].degree+"°";
    nowWeatherElement.innerHTML = hoursData.data.forecast_1h["0"].weather;
}