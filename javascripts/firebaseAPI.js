let firebaseConfig = {};
let uid = '';

const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
};

const setUID = (newUID) => {
  uid = newUID;
};

const addForecastToSaved = (newForecast) => {
  newForecast.uid = uid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/forecasts.json`,
      data: JSON.stringify(newForecast),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const deleteForecastFromDb = (movieId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/forecasts/${movieId}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const updateScaryWeatherInDb = (updatedForecast, forecastID) => {
  updatedForecast.uid = uid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/forecasts/${forecastID}.json`,
      data: JSON.stringify(updatedForecast),
    })
      .done((modifiedForecast) => {
        resolve(modifiedForecast);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getSavedWeather = () => {
  return new Promise((resolve, reject) => {
    const allWeatherArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/forecasts.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allForecastObj) => {
        if (allForecastObj !== null) {
          Object.keys(allForecastObj).forEach((key) => {
            allForecastObj[key].id = key;
            allWeatherArray.push(allForecastObj[key]);
          });
        }
        resolve(allWeatherArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  setConfig,
  setUID,
  addForecastToSaved,
  deleteForecastFromDb,
  updateScaryWeatherInDb,
  getSavedWeather,
};
