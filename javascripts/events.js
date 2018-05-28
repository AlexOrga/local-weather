const openWeather = require('./openWeather');

let zipCode = '';

const enterKeyPress = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      zipCode = $('#input').val();
      openWeather.showSingleResults(zipCode);
      forecastOptionEvents();
    }
  });
};

const submitButton = () => {
  $('#submitBtn').click(() => {
    zipCode = $('#input').val();
    openWeather.showSingleResults(zipCode);
    forecastOptionEvents();
  });
};

const currentWeatherBtn = () => {
  $('#currentBtn').click(() => {
    openWeather.showSingleResults(zipCode);
  });
};

const fiveDayForecastBtn = () => {
  $('#fiveDayBtn').click(() => {
    openWeather.showFiveDayResults(zipCode);
  });
};

const threeDayForecastBtn = () => {
  $('#threeDayBtn').click(() => {
    openWeather.showThreeDayResults(zipCode);
  });
};

const forecastOptionEvents = () => {
  currentWeatherBtn();
  fiveDayForecastBtn();
  threeDayForecastBtn();
};

const initiateSearch = () => {
  enterKeyPress();
  submitButton();
};

module.exports = {
  initiateSearch,
};
