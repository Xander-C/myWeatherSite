import { requestWeatherData } from './shared/api.js';
import { displayHours, displayDays, displayNow,drawChart, displayIndex, createAnimation } from './shared/util.js';
const bodyElement = document.querySelector("body");
const searchElement = document.querySelector("#input");
const nowCityElement = document.querySelector("#now-city");
const tipsElement = document.querySelector("#tip");
var tipsData;
var hoursData;
var daysData;
var indexData;
var hoursPage = 0;
document.querySelector("#tips-key").addEventListener("click", changeTips);
document.querySelector("#search-city").addEventListener("click", handleFetchWeather);
document.querySelector("#hours-up").addEventListener("click", () => {
    if (hoursPage == 1) {
        for (let i = 0; i < 12; i++) {
            const timeID = (i) => `#time${i}`;
            const timeElement = document.querySelector(timeID(i));
            const parent = timeElement.parentElement;
            createAnimation(parent, "flipInY", 500);
        }
        hoursPage = 0;
    }
    displayHours(hoursData, 0);
    
});
document.querySelector("#hours-down").addEventListener("click", () => {
    if (hoursPage == 0) {
        for (let i = 0; i < 12; i++) {
            const timeID = (i) => `#time${i}`;
            const timeElement = document.querySelector(timeID(i));
            const parent = timeElement.parentElement;
            createAnimation(parent, "flipInY", 500);
        }
        hoursPage = 1;
    }
    displayHours(hoursData, 1);
});


handleFetchWeather();


async function handleFetchWeather() {
    bodyElement.classList.remove("flash-infinite");
    bodyElement.classList.add("flash-infinite");
    const str = searchElement.value;
    const location = str.split(" ");
    console.log(location[0], location[1], location[2]);
    nowCityElement.innerHTML = str;
    daysData = requestWeatherData("forecast_24h", location[0], location[1], location[2]);
    hoursData = requestWeatherData("forecast_1h", location[0], location[1], location[2]);
    tipsData = requestWeatherData("tips", location[0], location[1], location[2]);
    indexData = requestWeatherData("index", location[0], location[1], location[2]);
    const p = await Promise.all([daysData, hoursData, tipsData, indexData]);
    console.log(daysData, hoursData, tipsData, p);
    daysData = p["0"];
    hoursData = p["1"];
    tipsData = p["2"];
    indexData = p["3"];
    if (daysData.data.forecast_24h["0"] == null) {
        bodyElement.classList.remove("flash-infinite");
        alert("输入的城市不存在");
        return;
    }
    displayNow(hoursData,tipsData);
    displayHours(hoursData, 0);
    displayDays(daysData);
    drawChart(daysData);
    displayIndex(indexData);
    bodyElement.classList.remove("flash-infinite");
}


var i = "0";
function changeTips(){
    if(i == "0") i = "1";
    else i = "0";
    tipsElement.innerHTML = tipsData.data.tips.observe[i];
}
