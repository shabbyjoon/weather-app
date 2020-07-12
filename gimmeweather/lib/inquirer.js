const inquirer = require('inquirer');

const askForToken = () => {
  const questions = [
    {
      name: 'token',
      type: 'input',
      message: 'Please enter a valid NOAA token:',
      validate: function(token) {
        if (token.length > 20) {
          return true;
        } else {
          return 'Please enter a valid token. Tokens can be requested at https://www.ncdc.noaa.gov/cdo-web/token';
        }
      }
    }
  ];
  return inquirer.prompt(questions);
};

module.exports.askForToken = askForToken;
