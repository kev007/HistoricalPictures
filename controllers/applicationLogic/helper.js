const chalk = require('chalk');

exports.log = (message) => {
  let currentDate = '[' + new Date().toUTCString() + '] ';
  console.log(chalk.blue(currentDate) + message);
};
