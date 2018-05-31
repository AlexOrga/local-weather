// const moment = require('moment');

const outputDivSingle = $('#weather');
const outputDivMulti = $('#multiDay');

const domString = (weatherToday) => {
  const iconCode = weatherToday.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  const pressureToIn = (weatherToday.main.pressure * 0.02953).toFixed(2);
  // const date = moment().format();
  let domString = '';
  domString +=  `<div class="weatherCard" id="currentWeather">`;
  domString +=    `<h1 class="city-name" data-name="${weatherToday.name}">${weatherToday.name}</h1>`;
  // domString +=    `<h5>${date}</h5>`;
  domString +=    `<h2>Today</h2>`;
  domString +=    `<img id="domIcon" class="city-image" data-image="${weatherToday.weather[0].icon}" src="${iconUrl}">`;
  domString +=    `<h3 class="city-temp" data-temp="${weatherToday.main.temp}">${Math.round(weatherToday.main.temp)}&deg; F</h3>`;
  domString +=    `<h5 class="city-description" data-description="${weatherToday.weather[0].main}">Conditions: ${weatherToday.weather[0].main}</h5>`;
  domString +=    `<h5 class="city-pressure" data-pressure="${weatherToday.main.pressure}">Air Pressure: ${pressureToIn} in.</h5>`;
  domString +=    `<h5 class="city-windspeed" data-wind="${weatherToday.wind.speed}">Wind Speed: ${weatherToday.wind.speed} mph</h5>`;
  domString +=    `<button class="saveBtn">Save</button>`;
  domString +=  `</div>`;
  printToDomSingle(domString);
};

const domStringFiveDay = (weather) => {
  let domString = '';
  domString += `<h1>Next 5 Days</h1>`;

  for (let i = 4; i < 37; i += 8) {
    let currentDay = '';
    currentDay = new Date(weather.list[i].dt * 1000).toString();
    const iconCode = weather.list[i].weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    const pressureToIn = (weather.list[i].main.pressure * 0.02953).toFixed(2);

    domString +=  `<div class="col-md-1 col-md-offset-1 weatherCard">`;
    domString +=     `<h5>${currentDay}</h5>`;
    domString +=     `<img id="domIcon" src="${iconUrl}">`;
    domString +=     `<h3>${Math.round(weather.list[i].main.temp)}&deg; F</h3>`;
    domString +=     `<h5>Conditions: ${weather.list[i].weather[0].main}</h5>`;
    domString +=     `<h5>Air Pressure: ${pressureToIn} in.</h5>`;
    domString +=     `<h5>Wind Speed: ${weather.list[i].wind.speed} mph</h5>`;
    domString +=  `</div>`;
  }
  printToDomMulti(domString);
};

const domStringThreeDay = (weather) => {
  let domString = '';
  domString += `<h1>Next 3 Days</h1>`;

  for (let i = 4; i < 21; i += 8) {
    let currentDay = '';
    currentDay = new Date(weather.list[i].dt * 1000).toString();
    const iconCode = weather.list[i].weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    const pressureToIn = (weather.list[i].main.pressure * 0.02953).toFixed(2);

    domString +=  `<div class="col-md-4">`;
    domString +=     `<h5>${currentDay}</h5>`;
    domString +=     `<img id="domIcon" src="${iconUrl}">`;
    domString +=     `<h3>${Math.round(weather.list[i].main.temp)}&deg; F</h3>`;
    domString +=     `<h5>Conditions: ${weather.list[i].weather[0].main}</h5>`;
    domString +=     `<h5>Air Pressure: ${pressureToIn} in.</h5>`;
    domString +=     `<h5>Wind Speed: ${weather.list[i].wind.speed} mph</h5>`;
    domString +=  `</div>`;
  }
  printToDomMulti(domString);
};

const printToDomSingle = (string) => {
  outputDivSingle.html(string);
};

const printToDomMulti = (string) => {
  outputDivMulti.html(string);
};

module.exports = {
  domString,
  domStringFiveDay,
  domStringThreeDay,
};
