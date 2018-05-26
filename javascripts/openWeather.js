const apiKeys = require('./apiKeys');
const dom = require('./dom');

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
      });
  });
};

const showResults = (zipEntered) => {
  searchOpenWeather(zipEntered)
    .then((result) => {
      dom.domString(result);
    })
    .catch((err) => {
      console.error('Oh no! There was an error', err);
    });
};

module.exports = {
  setKey,
  showResults,
};
