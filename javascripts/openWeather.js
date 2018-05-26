const apiKeys = require('./apiKeys');

const weatherKey = '';

const setKey = (key) => {
  weatherKey = apiKeys.getKeys();
};

const searchOpenWeather = (zipCode) => {
  return new Promise((resolve, reject) => {
    $.ajax(`api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${weatherKey}&units=imperial`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject(err);
    })
  });
};

const showResults = () => {

};

module.exports = {
  setKey,
};
