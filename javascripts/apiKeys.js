const openWeather = require('./openWeather');
const events = require('./events');
const firebaseAPI = require('./firebaseAPI');

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
      events.initiateSearch();
      firebaseAPI.setConfig(results.firebase);
      firebase.initializeApp(results.firebase);
    })
    .catch((err) => {
      console.error('Oops there was an error', err);
    });
};

module.exports = {
  getKeys,
};
