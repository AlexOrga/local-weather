const openWeather = require('./openWeather');

const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('../db/apiKeys.json')
      .done((data) => {
        resolve(data.apiKeys);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const getKeys = () => {
  apiKeys()
    .then((results) => {
      openWeather.setKey(results.openWeather.apiKey);
    })
    .catch((err) => {
      console.error('Oops there was an error', err);
    });
};

module.exports = {
  getKeys,
};
