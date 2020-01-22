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
const createWeatherUrl = (type, province, city) => `${WEATHER_BASE_URL}?source=xw&weather_type=${type}&province=${province}&city=${city}`;

// 请求近几天的天气信息
export const requestWeatherDays = async (province, city) => {
  const response = await fetch(createWeatherUrl("forecast_24h", province, city));
  const data = await response.json();
  return data;
}

// 请求近几小时的天气信息
export const requestWeatherHours = async (province, city) => {
  const response = await fetch(createWeatherUrl("forecast_1h", province, city));
  const data = await response.json();
  return data;
}

// 请求一些主要的天气信息，穿衣推荐，运动推荐等
export const requestWeatherIndex = async (province, city) => {
  const response = await fetch(createWeatherUrl("index", province, city));
  const data = await response.json();
  return data;
}

// 请求天气警报信息
export const requestWeatherAlarm = async (province, city) => {
  const response = await fetch(createWeatherUrl("alarm", province, city));
  const data = await response.json();
  return data;
}

// 请求城市车辆尾号限行的信息
export const requestLimit = async (province, city) => {
  const response = await fetch(createWeatherUrl("limit", province, city));
  const data = await response.json();
  return data;
}

// 请求。emmm,我也不知道怎么说，你请求一下就知道了
export const requestWeatherTips = async (province, city) => {
  const response = await fetch(createWeatherUrl("tips", province, city));
  const data = await response.json();
  return data;
}