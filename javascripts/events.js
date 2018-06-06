const openWeather = require('./openWeather');
const firebaseAPI = require('./firebaseAPI');
const dom = require('./dom');

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
  saveOneDayForecastEvent();
  saveFiveDayForecastEvent();
  saveThreeDayForecastEvent();
};

const saveOneDayForecastEvent = () => {
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

const saveFiveDayForecastEvent = () => {

};

const saveThreeDayForecastEvent = () => {

};

const showSavedForecasts = () => {
  $(document).on('click', '.savedWeather', () => {
    firebaseAPI.getSavedWeather()
      .then((forecastArray) => {
        dom.savedForecastsDom(forecastArray);
      })
      .catch((err) => {
        console.error('error displaying saved forecasts' ,err);
      });
  });
};

const authEvents = () => {
  $('#signin-btn').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const password = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        $('#signin-form').addClass('hide');
        $('#application').removeClass('hide');
        $('#signout-btn').removeClass('hide');
      })
      .catch((error) => {
        $('#signin-error-msg').text(error.message);
        $('#signin-error').removeClass('hide');
        console.error(error.message);
      });
  });

  $('#register-btn').click(() => {
    const email = $('#register-email').val();
    const password = $('#register-password').val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        // Handle Errors here.
        $('#register-error-msg').text(error.message);
        $('#register-error').removeClass('hide');
        const errorMessage = error.message;
        console.error('Error registering', errorMessage);
      });
  });

  $('#register-link').click(() => {
    $('#signin-form').addClass('hide');
    $('#registration-form').removeClass('hide');
  });

  $('#signin-link').click(() => {
    $('#signin-form').removeClass('hide');
    $('#registration-form').addClass('hide');
  });

  $('#signout-btn').click(() => {
    firebase.auth().signOut()
      .then(() => {
        $('#signout-btn').addClass('hide');
        $('#application').addClass('hide');
        $('#signin-form').removeClass('hide');
        $('#inputEmail').val('');
        $('#inputPassword').val('');
      })
      .catch((error) => {
        console.error('Error logging out', error);
      });
  });
};

const initiateSearch = () => {
  enterKeyPress();
  submitButton();
  showSavedForecasts();
  authEvents();
};

module.exports = {
  initiateSearch,
};
