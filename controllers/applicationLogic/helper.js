const colors = require('colors');

exports.log = (message) => {
  let currentDate = '[' + new Date().toUTCString() + '] ';
  console.log(colors.blue(currentDate) + message);
};
