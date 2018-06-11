const openWeather = require('./openWeather');
const firebaseAPI = require('./firebaseAPI');
const dom = require('./dom');

let inputValue = '';
let zipCode = '';

const enterKeyPress = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter' && $('#signout-btn').is(':visible')) {
      inputValue = $('#input').val();
      if (inputValue.length === 5) {
        $('#weather').html('');
        $('#multiDay').html('');
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
      $('#weather').html('');
      $('#multiDay').html('');
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
    $('#multiDay').html('');
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

const saveOneDayForecastEvent = () => {
  $(document).on('click', '.saveBtnOneDay', (e) => {
    const weatherCardToAdd = $(e.target).closest('.weatherCard');
    const weatherToAdd = {
      name: weatherCardToAdd.find('.city-name').data('name'),
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
      isScary: weatherCardToAdd.find('.scaryCheckBox').is(':checked') ? 'true' : 'false',
    };
    firebaseAPI.addForecastToSaved(weatherToAdd);
  });
};

const saveMultiDayForecastEvent = () => {
  $(document).on('click', '.saveBtnMultiDay', (e) => {
    const weatherCardToAdd = $(e.target).closest('.weatherCard');
    const weatherToAdd = {
      name: weatherCardToAdd.find('.city-timeStamp').data('name'),
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
      isScary: weatherCardToAdd.find('.scaryCheckBox').is(':checked') ? 'true' : 'false',
    };
    firebaseAPI.addForecastToSaved(weatherToAdd);
  });
};

const deleteSavedForecastEvent = () => {
  $(document).on('click', '.deleteSavedForecastBtn', (e) => {
    const weatherCardToDelete = $(e.target).closest('.savedForecastCard').data('firebaseId');
    firebaseAPI.deleteForecastFromDb(weatherCardToDelete)
      .then(() => {
        getSavedForecasts();
      })
      .catch((error) => {
        console.error('Error deleting saved forecast', error);
      });
  });
};

const getSavedForecasts = () => {
  firebaseAPI.getSavedWeather()
    .then((forecastArray) => {
      dom.savedForecastsDom(forecastArray);
      deleteSavedForecastEvent();
      updateScaryWeatherInDb();
    })
    .catch((err) => {
      console.error('error displaying saved forecasts' ,err);
    });
};

const showSavedForecastsBtnEvent = () => {
  $(document).on('click', '#savedWeather', () => {
    getSavedForecasts();
  });
};

const scaryWeatherEvent = () => {
  $(document).on('change', '.scaryCheckBox', (e) => {
    if ($(e.target).is(':checked')) {
      $(e.target).closest('.weatherCard').addClass('scary');
    } else {
      $(e.target).closest('.weatherCard').removeClass('scary');
    }
  });
};

// const updateSavedForecastBoolean = (boolean) => {
//   const weatherToUpdateID = $(e.target).closest('.savedForecastCard').data(firebaseId);
//   const weatherToUpdateCard = $(e.target).closest('.savedForecastCard');
//   const updatedWeather = {
//     main: {
//       pressure: weatherToUpdateCard.find('.pressure').text(),
//       temp: weatherToUpdateCard.find('.temp').text(),
//     },
//     weather: {
//       icon: weatherToUpdateCard.find('.image').data('image'),
//       main: weatherToUpdateCard.find('.description').text(),
//     },
//     wind: {
//       speed: weatherToUpdateCard.find('.wind').text(),
//     },
//     isScary: boolean,
//   };

//   firebaseAPI.updateScaryWeatherInDb(updatedWeather, weatherToUpdateID)
//     .then(() => {
//       getSavedForecasts();
//     })
//     .catch((error) => {
//       console.error('Error when updating firebase', error);
//     });
// };

const updateScaryWeatherInDb = () => {
  $(document).on('change', '.scaryCheckBox', (e) => {
    if ($(e.target).is(':checked')) {
      const weatherToUpdateID = $(e.target).closest('.savedForecastCard').data('firebaseId');
      const weatherToUpdateCard = $(e.target).closest('.savedForecastCard');
      const updatedWeather = {
        name: weatherToUpdateCard.find('.name').data('name'),
        weather: {
          main: weatherToUpdateCard.find('.description').data('description'),
          icon: weatherToUpdateCard.find('.image').data('image'),
        },
        main: {
          temp: weatherToUpdateCard.find('.temp').data('temp'),
          pressure: weatherToUpdateCard.find('.pressure').data('pressure'),
        },
        wind: {
          speed: weatherToUpdateCard.find('.wind').data('wind'),
        },
        isScary: 'true',
      };

      firebaseAPI.updateScaryWeatherInDb(updatedWeather, weatherToUpdateID)
        .then(() => {
          getSavedForecasts();
        })
        .catch((error) => {
          console.error('Error when updating firebase', error);
        });
    } else {
      const weatherToUpdateID = $(e.target).closest('.savedForecastCard').data('firebaseId');
      const weatherToUpdateCard = $(e.target).closest('.savedForecastCard');
      const updatedWeather = {
        name: weatherToUpdateCard.find('.name').data('name'),
        weather: {
          main: weatherToUpdateCard.find('.description').data('description'),
          icon: weatherToUpdateCard.find('.image').data('image'),
        },
        main: {
          temp: weatherToUpdateCard.find('.temp').data('temp'),
          pressure: weatherToUpdateCard.find('.pressure').data('pressure'),
        },
        wind: {
          speed: weatherToUpdateCard.find('.wind').data('wind'),
        },
        isScary: 'false',
      };

      firebaseAPI.updateScaryWeatherInDb(updatedWeather, weatherToUpdateID)
        .then(() => {
          getSavedForecasts();
        })
        .catch((error) => {
          console.error('Error when updating firebase', error);
        });
    }
  });
};

const forecastOptionEvents = () => {
  currentWeatherBtn();
  fiveDayForecastBtn();
  threeDayForecastBtn();
  saveOneDayForecastEvent();
  saveMultiDayForecastEvent();
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
        $('#nav-links').removeClass('hide');
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
      .then(() => {
        // firebase.auth().signInWithEmailAndPassword(email, password);
        $('#registration-form').addClass('hide');
        $('#application').removeClass('hide');
        $('#nav-links').removeClass('hide');
      })
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
        $('#nav-links').addClass('hide');
        $('#application').addClass('hide');
        $('#signin-form').removeClass('hide');
        $('#inputEmail').val('');
        $('#inputPassword').val('');
        $('#weather').html('');
        $('#multiDay').html('');
        $('#input').val('');
      })
      .catch((error) => {
        console.error('Error logging out', error);
      });
  });
};

const initiateSearch = () => {
  enterKeyPress();
  submitButton();
  showSavedForecastsBtnEvent();
  authEvents();
  scaryWeatherEvent();
};

module.exports = {
  initiateSearch,
};
