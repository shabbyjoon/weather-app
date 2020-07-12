const noaa = require('../lib/NOAA.js');
const inquirer  = require('../lib/inquirer.js');

module.exports = async () => {
  const token = await inquirer.askForToken();
  noaa.getToken(token);

}