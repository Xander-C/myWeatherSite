import { requestWeatherData } from './shared/api.js';
import { displayHours, displayDays } from './shared/util.js';
const bodyElement = document.querySelector("body");
const searchElement = document.querySelector("#input");
const nowCityElement = document.querySelector("#now-city");
const nowTempElement = document.querySelector("#now-temp");
const nowWeatherElement = document.querySelector("#now-weather");
const WindElement = document.querySelector("#wind");
const tipsElement = document.querySelector("#tip");
const bigIconElement = document.querySelector("#weather-icon");
var tipsData;
var hoursData;
handleFetchWeather();
document.querySelector("#tips-key").addEventListener("click", changeTips);
document.querySelector("#search-city").addEventListener("click", handleFetchWeather);
document.querySelector("#hours-up").addEventListener("click", () => {
    displayHours(hoursData,0);
});
document.querySelector("#hours-down").addEventListener("click", () => {
    displayHours(hoursData,1);
});
async function handleFetchWeather() {
    bodyElement.classList.remove("flash-infinite");
    bodyElement.classList.add("flash-infinite");
    const str = searchElement.value;
    const location = str.split(" ");
    const bigSrc = (day, code) => `./icon/big/${day}/${code}.png`
    console.log(location[0],location[1],location[2]);
    nowCityElement.innerHTML = str;
    const daysData = await requestWeatherData("forecast_24h", location[0], location[1], location[2]);
    if(!daysData.data.forecast_24h["0"]){
        bodyElement.classList.remove("flash-infinite");
        alert("错误的城市");
        return;
    }
    console.log(daysData);
    tipsData = await requestWeatherData("tips", location[0], location[1], location[2]);
    console.log(tipsData);
    hoursData = await requestWeatherData("forecast_1h", location[0], location[1], location[2]);
    console.log(hoursData);
    const time = hoursData.data.forecast_1h["0"].update_time.slice(-6, -4);
    let day = "day";
    if(time>18||time<6) day = "night";
    bigIconElement.src = bigSrc(day, hoursData.data.forecast_1h["0"].weather_code);
    nowTempElement.innerHTML = hoursData.data.forecast_1h["0"].degree + "°";
    nowWeatherElement.innerHTML = hoursData.data.forecast_1h["0"].weather;
    WindElement.innerHTML = hoursData.data.forecast_1h["0"].wind_direction + "&nbsp;" + hoursData.data.forecast_1h["0"].wind_power + "级";
    tipsElement.innerHTML = tipsData.data.tips.observe["0"];
    displayHours(hoursData, 0);
    displayDays(daysData);
    bodyElement.classList.remove("flash-infinite");
}
var i = "0";
function changeTips(){
    if(i == "0") i = "1";
    else i = "0";
    tipsElement.innerHTML = tipsData.data.tips.observe[i];
}
