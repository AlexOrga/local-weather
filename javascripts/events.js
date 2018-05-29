const openWeather = require('./openWeather');

let inputValue = '';
let zipCode = '';

const enterKeyPress = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      inputValue = $('#input').val();
      if (inputValue.length === 5) {
        zipCode = inputValue;
        openWeather.showSingleResults(zipCode);
        forecastOptionEvents();
      } else {
        alert('Please enter a valid 5 digit zip code');
      }
    }
  });
};

const submitButton = () => {
  $('#submitBtn').click(() => {
    inputValue = $('#input').val();
    if (inputValue.length === 5) {
      zipCode = inputValue;
      openWeather.showSingleResults(zipCode);
      forecastOptionEvents();
    } else {
      alert('Please enter a valid 5 digit zip code');
    }
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
