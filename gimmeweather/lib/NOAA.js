const request = require('request');
const Configstore = require('configstore');
const pkg = require('../package.json')
const rp = require('request-promise-native');
const url = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/'

const conf = new Configstore(pkg.name);


const getToken = (token) => {
    conf.set('noaaToken', token);
    getCitiesList(1000);
}

const getCitiesList = (num) => {
    let noaaToken = conf.get('noaaToken');

    let options1 = {
      url: url + `locations?locationcategoryid=CITY&sortfield=name&datasetid=GHCND&limit=1000`,
      headers : {
        'User-Agent': 'request',
        'token': noaaToken.token
      }
    }
    let options2 = {
      url: url +`/locations?locationcategoryid=CITY&sortfield=name&datasetid=GHCND&limit=1000&offset=${num}`,
      headers : {
        'User-Agent': 'request',
        'token': noaaToken.token
      }
    }
    rp(options2)
        .then(function(res) {
          let parsed = JSON.parse(res);
          conf.set('cityMap1', parsed.results)
          return parsed.results;})
            .catch(function(err) {
                console.log(err);}) 

    rp(options1)
        .then(function(res) {
          let parsed = JSON.parse(res);
          conf.set('cityMap2', parsed.results)
          console.log('Your token has been accepted and validated. Hooray!')
          return parsed.results;})
            .catch(function(error) {
              console.log(error);})
      
}

const findCityId = (city, startDate, endDate) => {
    let cityMap1 = conf.get('cityMap1');
    let cityMap2 = conf.get('cityMap2');
    let cityMap = cityMap2.concat(cityMap1); 
    conf.set('cityName', city);

    for (let obj in cityMap) {
      city = city.toLowerCase();
      splitMapName = cityMap[obj].name.split(',');
      let mapName = splitMapName[0].toLowerCase();
      if (city === mapName) {
        conf.set('cityId', cityMap[obj].id)
        getDailySummary(conf.get('cityId'), startDate, endDate);
        return;
      } 
    }
    console.log('This location is not in our daily summaries archive. Please try another city!'); 
}


const getDailySummary = (cityID, startDate, endDate) => {
    let noaaToken = conf.get('noaaToken');

    let options = {
      url: url + `data?datasetid=GHCND&locationid=${cityID}&startdate=${startDate}&enddate=${endDate}&limit=1000`,
      headers : {
        'User-Agent': 'request',
        'token': noaaToken.token
      }
    }
    request(options, function(error, response, body) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(body);

        let rawSummary = data.results;
        let dateMap = {};
        for (let key in rawSummary) {
          if (!dateMap[rawSummary[key].date]) {
            dateMap[rawSummary[key].date] = [];
            dateMap[rawSummary[key].date].push(rawSummary[key]);    
          } else { 
            dateMap[rawSummary[key].date].push(rawSummary[key]);    
          }
        }
        let dates = Object.keys(dateMap);
        let dateSummary = Object.values(dateMap);

        console.log('-----------------------------------------------------')
        console.log('****', conf.get('cityName'), '****')
        console.log('Date: ', dates[0].slice(0, 10));
          
        formatData(dateSummary[0])
        if (dateSummary[1]) {
          console.log('Date: ', dates[1].slice(0, 10));
          formatData(dateSummary[1])
        }
        if (dateSummary[2]) {
          console.log('Date: ', dates[2].slice(0, 10));
          formatData(dateSummary[2])
        }

    }
  })
}

const formatData = (array) => {
    if (array.length == 0) {
      console.log("Not enough data for this location. Sorry!")
    }

    let dataMap = {};

    dataMap["Precipitation"] = [];
    dataMap["Snowfall"] = [];
    dataMap["Snow Depth"] = [];
    dataMap["Max Temperature"] = [];
    dataMap["Min Temperature"] = [];
    dataMap["Temperature at the time of observation"] = [];
    dataMap["Average Temperature"] = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i].value != 0) {
        if (array[i]["datatype"] === "PRCP") {
          dataMap["Precipitation"].push(array[i].value);
        }
        if (array[i]["datatype"] === "SNOW") {
          dataMap["Snowfall"].push(array[i].value);
        }
        if (array[i]["datatype"] === "SNWD") {
          dataMap["Snow Depth"].push(array[i].value);
        }
        if (array[i]["datatype"] === "TMAX") {
          dataMap["Max Temperature"].push(array[i].value);
        }
        if (array[i]["datatype"] === "TMIN") {
          dataMap["Min Temperature"].push(array[i].value);
        }
        if (array[i]["datatype"] === "TOBS") {
          dataMap["Temperature at the time of observation"].push(array[i].value);
        }
        if (array[i]["datatype"] === "TAVG") {
          dataMap["Average Temperature"].push(array[i].value);
        }
      }
    }

    for (let key in dataMap) {
      let availableData = (dataMap[key].length > 0) ? dataMap[key] : 0;
      console.log(key + ": " + availableData);
    }

    console.log('-----------------------------------------------------')
    
}

module.exports.getToken = getToken;
module.exports.getCitiesList = getCitiesList;
module.exports.findCityId = findCityId;
module.exports.getDailySummary = getDailySummary;