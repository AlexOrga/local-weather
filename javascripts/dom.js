const outputDiv = $('#weather');

const domString = (weather) => {
  let domString = '';
  domString += `The temperature in ${weather.name} is ${weather.main.temp}`;
  printToDom(domString);
};

const printToDom = (string) => {
  outputDiv.html(string);
};

module.exports = {
  domString,
};
