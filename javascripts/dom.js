
const outputDivSingle = $('#weather');
const outputDivMulti = $('#multiDay');

const printToDomSingle = (string) => {
  outputDivSingle.html(string);
};

const printToDomMulti = (string) => {
  outputDivMulti.html(string);
};

const domString = (weatherToday) => {
  const iconCode = weatherToday.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  const pressureToIn = (weatherToday.main.pressure * 0.02953).toFixed(2);
  let domString = '';
  domString +=  `<div class="weatherCard thumbnail col-sm-3 col-sm-offset-5" id="currentWeather">`;
  domString +=    `<h1 class="city-name" data-name="${weatherToday.name}">${weatherToday.name}</h1>`;
  domString +=    `<h2>Today</h2>`;
  domString +=    `<img id="domIcon" class="city-image" data-image="${weatherToday.weather[0].icon}" src="${iconUrl}">`;
  domString +=    `<h3 class="city-temp" data-temp="${weatherToday.main.temp}">${Math.round(weatherToday.main.temp)}&deg; F</h3>`;
  domString +=    `<h5 class="city-description" data-description="${weatherToday.weather[0].main}">Conditions: ${weatherToday.weather[0].main}</h5>`;
  domString +=    `<h5 class="city-pressure" data-pressure="${weatherToday.main.pressure}">Air Pressure: ${pressureToIn} in.</h5>`;
  domString +=    `<h5 class="city-windspeed" data-wind="${weatherToday.wind.speed}">Wind Speed: ${weatherToday.wind.speed} mph</h5>`;
  domString +=    `<button class="saveBtnOneDay">Save</button>`;
  domString +=     `<div>`;
  domString +=        `<input type="checkbox" class="scaryCheckBox">`;
  domString +=        `<label for="scaryCheckBox">This scares me!</label>`;
  domString +=     `</div>`;
  domString +=  `</div>`;
  printToDomSingle(domString);
};

const domStringFiveDay = (weather) => {
  let domString = '';
  domString += `<h1>Next 5 Days</h1>`;

  for (let i = 4; i < 37; i += 8) {
    const iconCode = weather.list[i].weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    const pressureToIn = (weather.list[i].main.pressure * 0.02953).toFixed(2);

    if (i % 3 === 0) {
      domString += `<div class="row">`;
    }
    domString +=  `<div class="col-md-2 weatherCard">`;
    domString +=     `<h5 class="city-timeStamp" data-name="${weather.city.name}" data-time="${weather.list[i].dt_txt}">${weather.list[i].dt_txt}</h5>`;
    domString +=     `<img id="domIcon" class="city-image" data-image="${weather.list[i].weather[0].icon}" src="${iconUrl}">`;
    domString +=     `<h3 class="city-temp" data-temp="${weather.list[i].main.temp}">${Math.round(weather.list[i].main.temp)}&deg; F</h3>`;
    domString +=     `<h5 class="city-description" data-description="${weather.list[i].weather[0].main}">Conditions: ${weather.list[i].weather[0].main}</h5>`;
    domString +=     `<h5 class="city-pressure" data-pressure="${weather.list[i].main.pressure}">Air Pressure: ${pressureToIn} in.</h5>`;
    domString +=     `<h5 class="city-windspeed" data-wind="${weather.list[i].wind.speed}">Wind Speed: ${weather.list[i].wind.speed} mph</h5>`;
    domString +=     `<button class="saveBtnMultiDay">Save</button>`;
    domString +=     `<div>`;
    domString +=        `<input type="checkbox" class="scaryCheckBox">`;
    domString +=        `<label for="scaryCheckBox">This scares me!</label>`;
    domString +=     `</div>`;
    domString +=  `</div>`;
    if (i % 3 === 2) {
      domString += `</div>`;
    }
  }
  printToDomMulti(domString);
};

const domStringThreeDay = (weather) => {
  let domString = '';
  domString += `<h1>Next 3 Days</h1>`;

  for (let i = 4; i < 21; i += 8) {
    const iconCode = weather.list[i].weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    const pressureToIn = (weather.list[i].main.pressure * 0.02953).toFixed(2);

    domString +=  `<div class="col-md-1 col-md-offset-1 weatherCard">`;
    domString +=     `<h5 class="city-timeStamp" data-name="${weather.city.name}" data-time="${weather.list[i].dt_txt}">${weather.list[i].dt_txt}</h5>`;
    domString +=     `<img id="domIcon" class="city-image" data-image="${weather.list[i].weather[0].icon}" src="${iconUrl}">`;
    domString +=     `<h3 class="city-temp" data-temp="${weather.list[i].main.temp}">${Math.round(weather.list[i].main.temp)}&deg; F</h3>`;
    domString +=     `<h5 class="city-description" data-description="${weather.list[i].weather[0].main}">Conditions: ${weather.list[i].weather[0].main}</h5>`;
    domString +=     `<h5 class="city-pressure" data-pressure="${weather.list[i].main.pressure}">Air Pressure: ${pressureToIn} in.</h5>`;
    domString +=     `<h5 class="city-windspeed" data-wind="${weather.list[i].wind.speed}">Wind Speed: ${weather.list[i].wind.speed} mph</h5>`;
    domString +=     `<button class="saveBtnMultiDay">Save</button>`;
    domString +=     `<div>`;
    domString +=        `<input type="checkbox" class="scaryCheckBox">`;
    domString +=        `<label for="scaryCheckBox">This scares me!</label>`;
    domString +=     `</div>`;
    domString +=  `</div>`;
  }
  printToDomMulti(domString);
};

const savedForecastsDom = (savedWeatherArray) => {
  outputDivSingle.html('');
  let domString = '';
  savedWeatherArray.forEach((weather) => {
    const iconCode = weather.weather.icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    const pressureToIn = (weather.main.pressure * 0.02953).toFixed(2);
    domString +=  `<div class="thumbnail col-md-4 savedForecastCard ${weather.isScary === 'true' ? 'scary' : ''}" data-firebase-id="${weather.id}">`;
    // domString +=     `<h5>${index}</h5>`;
    domString +=     `<h3 class="name" data-name="${weather.name}">${weather.name}</h3>`;
    domString +=     `<img class="image" src="${iconUrl}" data-image="${weather.weather.icon}">`;
    domString +=     `<h3 class="temp" data-temp="${weather.main.temp}">${Math.round(weather.main.temp)}&deg; F</h3>`;
    domString +=     `<h5 class="description" data-description="${weather.weather.main}">Conditions: ${weather.weather.main}</h5>`;
    domString +=     `<h5 class="pressure" data-pressure="${weather.main.pressure}">Air Pressure: ${pressureToIn} in.</h5>`;
    domString +=     `<h5 class="wind" data-wind="${weather.wind.speed}">Wind Speed: ${weather.wind.speed} mph</h5>`;
    domString +=     `<button type="button" class="btn btn-default btn-sm align-left deleteSavedForecastBtn">`;
    domString +=        `<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>`;
    domString +=     `</button>`;
    domString +=     `<div>`;
    domString +=        `<input ${weather.isScary === 'true' ? 'checked' : 'unchecked'} type="checkbox" class="scaryCheckBox">`;
    domString +=        `<label for="scaryCheckBox">This scares me!</label>`;
    domString +=     `</div>`;
    domString +=  `</div>`;
  });
  printToDomMulti(domString);
};

module.exports = {
  domString,
  domStringFiveDay,
  domStringThreeDay,
  savedForecastsDom,
};
