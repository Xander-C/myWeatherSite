/**
 * 这个文件的里的代码都和请求有关
 */

// 这是天气api的地址
const WEATHER_BASE_URL = 'https://my-weather12138.herokuapp.com/';

/**
 * 
 * @param {String} type 可以是forecast_1h|forecast_24h|index|alarm|limit|tips
 * @param {String} province 查询的省
 * @param {String} city 查询的市
 */
const createWeatherUrl = (type, province, city, county) => `${WEATHER_BASE_URL}?source=xw&weather_type=${type}&province=${province}&city=${city}&county=${county}`;

//发送请求
export const requestWeatherData = async (type, province, city, county = 0) => {
    const response = await fetch(createWeatherUrl(type, province, city, county));
    const data = await response.json();
    console.log(data);
    return data;
}
