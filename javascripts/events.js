const openWeather = require('./openWeather');
const firebaseAPI = require('./firebaseAPI');

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

const saveForecastEvent = () => {
  $(document).on('click', '.saveBtn', (e) => {
    const weatherCardToAdd = $(e.target).closest('.weatherCard');
    const weatherToAdd = {
      name: weatherCardToAdd.find('.city-name').data(name),
      weather: {
        main: weatherCardToAdd.find('.city-description').data('description'),
        icon: weatherCardToAdd.find('.city-image').data('image'),
      },
      main: {
        temp: weatherCardToAdd.find('.city-temp').data('temp'),
        pressure: weatherCardToAdd.find('.city-pressure').data('pressure'),
      },
      wind: {
        speed: weatherCardToAdd.find('.city-windspeed').data('wind'),
      },
    };
    firebaseAPI.addForecastToSaved(weatherToAdd);
  });
};

const initiateSearch = () => {
  enterKeyPress();
  submitButton();
  saveForecastEvent();
};

module.exports = {
  initiateSearch,
};
