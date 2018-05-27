const openWeather = require('./openWeather');

let zipCode = '';

const enterKeyPress = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      zipCode = $('#input').val();
      openWeather.showResults(zipCode);
    }
  });
};

const submitButton = () => {
  $('#submitBtn').click(() => {
    zipCode = $('#input').val();
    openWeather.showResults(zipCode);
  });
};

const initiateSearch = () => {
  enterKeyPress();
  submitButton();
};

module.exports = {
  initiateSearch,
};
