let firebaseConfig = {};

const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
};

const addForecastToSaved = (newForecast) => {
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

const getSavedWeather = () => {
  return new Promise((resolve, reject) => {
    const allWeatherArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/forecasts.json`,
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
  addForecastToSaved,
  setConfig,
  getSavedWeather,
};
