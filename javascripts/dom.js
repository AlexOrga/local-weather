// const moment = require('moment');

const outputDiv = $('#weather');

const domString = (weatherToday) => {
  const iconCode = weatherToday.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  const pressureToIn = (weatherToday.main.pressure * 0.02953).toFixed(2);
  // const date = moment().format();
  // let currentDay = '';
  // currentDay = new Date(1527800400 * 1000).toString();
  let domString = '';
  domString +=  `<div id="currentForecast">`;
  // domString +=    `<h5>${date}</h5>`;
  domString +=    `<h1>${weatherToday.name}</h1>`;
  domString +=    `<img id="domIcon" src="${iconUrl}">`;
  domString +=    `<h3>${weatherToday.main.temp} degrees</h3>`;
  domString +=    `<h5>Conditions: ${weatherToday.weather[0].main}</h5>`;
  domString +=    `<h5>Air Pressure: ${pressureToIn} in.</h5>`;
  domString +=    `<h5>Wind Speed: ${weatherToday.wind.speed} mph</h5>`;
  domString +=  `</div>`;
  printToDom(domString);
};

const domStringFiveDay = (weather) => {
  let domString = '';
  domString += `<h1>${weather.city.name}</h1>`;

  for (let i = 4; i < 37; i += 8) {
    const iconCode = weather.list[i].weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    const pressureToIn = (weather.list[i].main.pressure * 0.02953).toFixed(2);

    domString +=  `<div class="col-md-1 col-md-offset-1">`;
    domString +=     `<img id="domIcon" src="${iconUrl}">`;
    domString +=     `<h3>${weather.list[i].main.temp} degrees</h3>`;
    domString +=     `<h5>Conditions: ${weather.list[i].weather[0].main}</h5>`;
    domString +=     `<h5>Air Pressure: ${pressureToIn} in.</h5>`;
    domString +=     `<h5>Wind Speed: ${weather.list[i].wind.speed} mph</h5>`;
    domString +=  `</div>`;
  }
  printToDom(domString);
};

const printToDom = (string) => {
  outputDiv.html(string);
};

module.exports = {
  domString,
  domStringFiveDay,
};
