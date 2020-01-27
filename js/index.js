import { requestWeatherData } from './shared/api.js';
import { displayHours, displayDays, displayNow,drawChart } from './shared/util.js';
const bodyElement = document.querySelector("body");
const searchElement = document.querySelector("#input");
const nowCityElement = document.querySelector("#now-city");
const tipsElement = document.querySelector("#tip");
var tipsData;
var hoursData;
document.querySelector("#tips-key").addEventListener("click", changeTips);
document.querySelector("#search-city").addEventListener("click", handleFetchWeather);
document.querySelector("#hours-up").addEventListener("click", () => {
    displayHours(hoursData,0);
});
document.querySelector("#hours-down").addEventListener("click", () => {
    displayHours(hoursData,1);
});


handleFetchWeather();


async function handleFetchWeather() {
    bodyElement.classList.remove("flash-infinite");
    bodyElement.classList.add("flash-infinite");
    const str = searchElement.value;
    const location = str.split(" ");
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
    displayNow(hoursData,tipsData);
    displayHours(hoursData, 0);
    displayDays(daysData);
    drawChart(daysData);
    bodyElement.classList.remove("flash-infinite");
}


var i = "0";
function changeTips(){
    if(i == "0") i = "1";
    else i = "0";
    tipsElement.innerHTML = tipsData.data.tips.observe[i];
}
