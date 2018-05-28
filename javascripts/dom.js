const outputDiv = $('#weather');

const domString = (weatherToday) => {
  const iconCode = weatherToday.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  const pressureToIn = (weatherToday.main.pressure * 0.02953).toFixed(2);
  // let currentDay = '';
  // currentDay = new Date(1527800400 * 1000).toString();
  let domString = '';
  domString +=  `<div id="changeDayButtons">`;
  domString +=    `<button class="btn btn-default">Current Weather</button>`;
  domString +=    `<button class="btn btn-default">5 Day Forecast</button>`;
  domString +=    `<button class="btn btn-default">3 Day Forecast</button>`;
  domString +=  `</div>`;
  domString +=  `<div id="currentForecast">`;
  domString +=    `<h1>${weatherToday.name}</h1>`;
  domString +=    `<img id="domIcon" src="${iconUrl}">`;
  domString +=    `<h3>${weatherToday.main.temp} degrees</h3>`;
  domString +=    `<h5>Conditions: ${weatherToday.weather[0].main}</h5>`;
  domString +=    `<h5>Air Pressure: ${pressureToIn} in.</h5>`;
  domString +=    `<h5>Wind Speed: ${weatherToday.wind.speed} mph</h5>`;
  domString +=  `</div>`;
  printToDom(domString);
};

const printToDom = (string) => {
  outputDiv.html(string);
};

module.exports = {
  domString,
};
