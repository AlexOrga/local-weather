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

module.exports = {
  addForecastToSaved,
  setConfig,
};
