/**
 * 
 * @param {String} innerHTML 元素内部的HTML
 * @param {String} tagName 元素标签名
 * @param {String} style 元素的样式
 */
export function createElement(innerHTML,tagName="span",style="margin: 0 1rem 0 1rem;") {
  const element = document.createElement(tagName);
  element.innerHTML = innerHTML;
  element.style = style;
  return element;
}

/**
 * 
 * @param {HTMLElement} element 目标HTML元素
 * @param {String} animationClassName 动画的class名，参考animation.css的官方文档
 * @param {Number} duration 动画的持续时间，如果为0，则返回一个停止动画的函数
 */
export function createAnimation(element, animationClassName,duration=0){
  element.classList.remove(animationClassName);
  element.classList.add(animationClassName);
  const stopAnimation = () => element.classList.remove(animationClassName);
  if (duration === 0) {
    return stopAnimation;
  }
  else {
    setTimeout(stopAnimation, duration);
  }
}

export function displayNow(hoursData, tipsData) {
    const nowTempElement = document.querySelector("#now-temp");
    const nowWeatherElement = document.querySelector("#now-weather");
    const WindElement = document.querySelector("#wind");
    const tipsElement = document.querySelector("#tip");
    const bigIconElement = document.querySelector("#weather-icon");
    const windIcon = document.querySelector("#wind-icon");
    const bigSrc = (day, code) => `./icon/big/${day}/${code}.png`
    const windIconPosition = new Map([["北风","-192px -166px"],["东北风","-168px -192px"],["东风","-144px -192px"],["东南风","-192px -74px"],["南风","-98px -192px"],["西南风","-76px -192px"],["西风","-192px -52px"],["西北风","-30px -192px"]]);
    const time = hoursData.data.forecast_1h["0"].update_time.slice(-6, -4);
    let day = "day";
    if (time > 18 || time < 6) day = "night";
    windIcon.style.backgroundPosition = windIconPosition.get(hoursData.data.forecast_1h["0"].wind_direction);
    bigIconElement.src = bigSrc(day, hoursData.data.forecast_1h["0"].weather_code);
    nowTempElement.innerHTML = hoursData.data.forecast_1h["0"].degree + "°";
    nowWeatherElement.innerHTML = hoursData.data.forecast_1h["0"].weather;
    WindElement.innerHTML = hoursData.data.forecast_1h["0"].wind_direction + "&nbsp;" + hoursData.data.forecast_1h["0"].wind_power + "级";
    tipsElement.innerHTML = tipsData.data.tips.observe["0"];
}

export function displayHours(hoursData, page=0) {
    const timeID = (i) => `#time${i}`;
    const iconID = (i) => `#icon${i}`;
    const degreeID = (i) => `#degree${i}`;
    const dataIndex = (i) => `${i}`;
    const creatSrc = (day, code) => `./icon/little/${day}/${code}.png`

    for (let i = 0 ; i < 12 ; i++) {
        const timeElement = document.querySelector(timeID(i));
        const iconElement = document.querySelector(iconID(i));
        const degreeElement = document.querySelector(degreeID(i));
        const time = hoursData.data.forecast_1h[dataIndex(i+page*12)].update_time.slice(-6, -4);
        let day = "day";
        if(time>18||time<6) day = "night"
        timeElement.innerHTML = time + ":00";
        iconElement.src = creatSrc(day, hoursData.data.forecast_1h[dataIndex(i+page*12)].weather_code);
        degreeElement.innerHTML = hoursData.data.forecast_1h[dataIndex(i+page*12)].degree + "°C";
    }
}

export function displayDays(daysData) {
    const dayIndex = (i) => `#day${i} .day`;
    const dateIndex = (i) => `#day${i} .date`;
    const dayWeatherIndex = (i) => `#day${i} .day-weather`;
    const dayIconIndex = (i) => `#day${i} .day-icon`;
    const nightWeatherIndex = (i) => `#day${i} .night-weather`;
    const nightIconIndex = (i) => `#day${i} .night-icon`;
    const windIndex = (i) => `#day${i} .wind-24h`;
    const dataIndex = (i) => `${i}`;
    const creatSrc = (day, code) => `./icon/little/${day}/${code}.png`
    const week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let today = new Date();
    let DAY = today.getDay();
    for (let i = 0; i < 8; i++){
        const dayElement = document.querySelector(dayIndex(i));
        const dateElement = document.querySelector(dateIndex(i));
        const dayWeather = document.querySelector(dayWeatherIndex(i));
        const dayIcon = document.querySelector(dayIconIndex(i));
        const nightWeather = document.querySelector(nightWeatherIndex(i));
        const nightIcon = document.querySelector(nightIconIndex(i));
        const windElement = document.querySelector(windIndex(i));
        const time = daysData.data.forecast_24h[dataIndex(i)].time;
        if (i > 3) dayElement.innerHTML = week[(DAY + i - 2)%7];
        dateElement.innerHTML = time.slice(5, 7) + "月" + time.slice(8, 10) + "日";
        dayWeather.innerHTML = daysData.data.forecast_24h[dataIndex(i)].day_weather_short;
        dayIcon.src = creatSrc("day", daysData.data.forecast_24h[dataIndex(i)].day_weather_code);
        nightWeather.innerHTML = daysData.data.forecast_24h[dataIndex(i)].night_weather_short;
        nightIcon.src = creatSrc("night", daysData.data.forecast_24h[dataIndex(i)].night_weather_code);
        windElement.innerHTML = daysData.data.forecast_24h[dataIndex(i)].night_wind_direction +
            "&nbsp;" + daysData.data.forecast_24h[dataIndex(i)].night_wind_power + "级";
    }
}

export function drawChart(daysData) {
    const canvas = document.querySelector("#chart-canvas");
    const x = [46.25, 138.75, 231.25, 323.75, 416.25, 508.75, 601.25, 693.75];
    const dataIndex = (i) => `${i}`;
    if (!canvas.getContext)
        return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 739, 173);
    let dayDegree = [];
    let nightDegree = [];
    for (let i = 0; i < 8; i++)
        dayDegree.push(parseInt(daysData.data.forecast_24h[dataIndex(i)].max_degree));
    for (let i = 0; i < 8; i++)
        nightDegree.push(parseInt(daysData.data.forecast_24h[dataIndex(i)].min_degree));
    const max = Math.max(...dayDegree);
    const min = Math.min(...nightDegree);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FCC370";
    ctx.fillStyle = "#FCC370";
    ctx.moveTo(x[0], 35 + 104 * (max - dayDegree[0]) / (max - min));
    for (let i = 1; i < 8; i++)
        ctx.lineTo(x[i], 35 + 104 * (max - dayDegree[i]) / (max - min));
    ctx.stroke();
    for (let i = 0; i < 8; i++){
        ctx.beginPath();
        ctx.arc(x[i], 35 + 104 * (max - dayDegree[i]) / (max - min), 4, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.beginPath();
    ctx.closePath();         //上一个画笔的Path会牵连到下一笔
    ctx.strokeStyle = "#94CCF9";
    ctx.fillStyle = "#94CCF9";
    ctx.moveTo(x[0], 35 + 104 * (max - nightDegree[0]) / (max - min));
    for (let i = 1; i < 8; i++)
        ctx.lineTo(x[i], 35 + 104 * (max - nightDegree[i]) / (max - min));
    ctx.stroke();
    for (let i = 0; i < 8; i++){
        ctx.beginPath();
        ctx.arc(x[i], 35 + 104 * (max - nightDegree[i]) / (max - min), 4, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.beginPath();
    ctx.closePath();
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    for (let i = 0; i < 8; i++){
        ctx.fillText(daysData.data.forecast_24h[dataIndex(i)].max_degree + "°", x[i],20 + 104 * (max - dayDegree[i]) / (max - min));
        ctx.fillText(daysData.data.forecast_24h[dataIndex(i)].min_degree + "°", x[i], 60 + 104 * (max - nightDegree[i]) / (max - min));
    }
}

export function displayIndex(indexData, page = 0) {
  
    const targets = [
      {
        selector: "#index0",
        name: "clothes"
      },
      {
        selector: "#index1",
        name:"umbrella"
      },
      {
        selector: "#index2",
        name:"cold"
      },
      {
        selector: "#index3",
        name:"tourism"
      },
      {
        selector: "#index4",
        name:"sports"
      },
      {
        selector: "#index5",
        name:"sunscreen"
      }
    ];
  
    for (const item of targets) {
      const { name, info, detail } = indexData.data.index[item.name];
      const parent = document.querySelector(item.selector);
  
      const pointer1 = parent.children[0].children[1];
      const pointer2 = parent.children[1].children[0];
  
      pointer1.innerHTML = name + "&nbsp;" + info;
      pointer2.innerHTML = detail;
    }
  }
  