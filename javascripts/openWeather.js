const dom = require('./dom');

let weatherKey = '';

const setKey = (key) => {
  weatherKey = key;
};

const searchOpenWeather = (zipCode) => {
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${weatherKey}&units=imperial`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const showResults = (zipCodeEntered) => {
  searchOpenWeather(zipCodeEntered)
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
  weatherKey,
};
