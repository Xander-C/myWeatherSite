import { requestWeatherData } from './shared/api.js';
const bodyElement = document.querySelector("body");
const searchElement = document.querySelector("#input");
const nowCityElement = document.querySelector("#now-city");
const nowTempElement = document.querySelector("#now-temp");
const nowWeatherElement = document.querySelector("#now-weather");
const WindElement = document.querySelector("#wind");
const tipsElement = document.querySelector("#tip");
const hoursElement = document.querySelector("#hours");
document.querySelector("#tips-key").addEventListener("click", changeTips);
document.querySelector("#search-city").addEventListener("click", handleFetchWeather);
var tipsData;
handleFetchWeather();
let i = "0";
function changeTips(){
    if(i == "0") i = "1";
    else i = "0";
    tipsElement.innerHTML = tipsData.data.tips.observe[i];
}
async function handleFetchWeather() {
    bodyElement.classList.remove("flash-infinite");
    bodyElement.classList.add("flash-infinite");
    const str = searchElement.value;
    const location = str.split(" ");
    console.log(location[0],location[1]);
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
    const hoursData = await requestWeatherData("forecast_1h", location[0], location[1], location[2]);
    console.log(hoursData);

    nowTempElement.innerHTML = hoursData.data.forecast_1h["0"].degree + "°";
    nowWeatherElement.innerHTML = hoursData.data.forecast_1h["0"].weather;
    WindElement.innerHTML = hoursData.data.forecast_1h["0"].wind_direction + "&nbsp;" + hoursData.data.forecast_1h["0"].wind_power + "级";
    for (var i = 0; i < 12; i++) {
        // let pointer = hoursElement.firstChild;
        const timeIndex = (i) => `#${i}time`
        const dataIndex = (i) => `${i}`
        let time = hoursData.data.forecast_1h[dataIndex(i)].update_time.slice(7, 9);
        // pointer = pointer.firstChild;
        document.querySelector("#1time").innerHTML = time + ":00";
    }
    bodyElement.classList.remove("flash-infinite");
}