import { requestWeatherDays, requestWeatherHours, requestWeatherAlarm, requestWeatherTips } from './shared/api.js';
const searchElement = document.querySelector("#input");
const nowCityElement = document.querySelector("#now-city");
const nowTempElement = document.querySelector("#now-temp");
const nowWeatherElement = document.querySelector("#now-weather");
const WindElement = document.querySelector("#wind");
const tipsElement = document.querySelector("#tip")
document.querySelector("#tips-key").addEventListener("click", changeTips);
document.querySelector("#search-city").addEventListener("click", handleFetchWeather);
var tipsData;
handleFetchWeather();
let i = "0";
async function changeTips(){
    if(i == "0") i = "1";
    else i = "0";
    tipsElement.innerHTML = tipsData.data.tips.observe[i];
}
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
    const alarmData = await requestWeatherAlarm(location[0],location[1]);
    console.log(alarmData);
    tipsData = await requestWeatherTips(location[0],location[1]);
    console.log(tipsData);

    nowTempElement.innerHTML = hoursData.data.forecast_1h["0"].degree + "°";
    nowWeatherElement.innerHTML = hoursData.data.forecast_1h["0"].weather;
    WindElement.innerHTML = hoursData.data.forecast_1h["0"].wind_direction + "&nbsp;" + hoursData.data.forecast_1h["0"].wind_power + "级";
}