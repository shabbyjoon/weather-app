const noaa = require('../lib/NOAA.js');

let errors = false;

const checkRawInputErrors = (input) => {
  if (input.length < 3) {
    console.log('Error: Please enter a valid city name, start date (YYYY-MM-DD) and end date (YYYY-MM-DD).');
    errors = true;
    return;
  } 

}

const checkCityAndDateErrors = (cityName, startDate, endDate) => {

  if (/\d/.test(cityName)) {
    console.log('Error: Please enter a valid city name. Numbers may not be included.');
    errors = true;
    return;
  }
  if (startDate.search(/[a-zA-Z]/g) != -1 || startDate.length < 10){
    console.log('Error: Please enter a valid start date. The format must be YYYY-MM-DD and must be followed by a comma.')
    errors = true;
    return;
  }
  if (startDate.substring(5,7) > 12 || endDate.substring(5,7) > 12 || startDate.substring(8,10) > 31 || endDate.substring(8,10) > 31) {
    console.log('Error: Please enter a valid date. The format must be YYYY-MM-DD.')
    errors = true;
    return;
  }
  if (endDate.search(/[a-zA-Z]/g) != -1 || endDate.length < 10){
    console.log('Error: Please enter a valid end date. The format must be YYYY-MM-DD and does not require a trailing comma.')
    errors = true;
    return;
  }

}

module.exports = async (args) => {
  let input = Object.values(args);
  let city, startDate, endDate;
  input = input[0];

  checkRawInputErrors(input);
  if (errors) {
    return;
  }

  if (input[1].charAt(input[1].length-1) !== "," && input[2].charAt(input[2].length-1) === ",") {
    input[2]= input[2].slice(0, input[2].length-1);
    city = input[1] + " " + input[2]
    startDate = input[3].slice(0, input[3].length-1);
    endDate = input[4];

    checkCityAndDateErrors(city, startDate, endDate);
    if (errors) {
      return;
    }
    noaa.findCityId(city, startDate, endDate);
  } else {
    city = input[1].slice(0, input[1].length-1);
    startDate = input[2].slice(0, input[2].length-1);
    endDate = input[3]

    checkCityAndDateErrors(city, startDate, endDate);
    if (errors) {
      return;
    }
    noaa.findCityId(city, startDate, endDate);
  }
}

