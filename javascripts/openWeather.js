const dom = require('./dom');

let weatherKey = '';

const setKey = (key) => {
  weatherKey = key;
};

const searchOpenWeatherCurrentDay = (zipCode) => {
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

const showSingleResults = (zipCodeEntered) => {
  searchOpenWeatherCurrentDay(zipCodeEntered)
    .then((result) => {
      dom.domString(result);
    })
    .catch((err) => {
      console.error('Oh no! There was an error', err);
    });
};

const searchOpenWeatherFiveDay = (zipCode) => {
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&APPID=${weatherKey}&units=imperial`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject('Oops there was a problem!', err);
      });
  });
};

const showFiveDayResults = (zipCodeEntered) => {
  searchOpenWeatherFiveDay(zipCodeEntered)
    .then((result) => {
      dom.domStringFiveDay(result);
    })
    .catch((err) => {
      console.error('Oops, big boo-boo', err);
    });
};

module.exports = {
  setKey,
  showSingleResults,
  showFiveDayResults,
};
