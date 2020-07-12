 *** GIMMEWEATHER ***
 
 # INTRODUCTION
  GIMMEWEATHER is a simple CLI application that returns daily summaries of the weather given a city, 
  start date and end date, for a maximum of three days. The ClI uses `weather` to invoke the application 
  and requires a token to run. Run `weather --help` to see a list of topics available.
 
 # REQUIREMENTS
  -Node.js (https://nodejs.org/en/)
  -NPM (https://www.npmjs.com/get-npm)
  -NOAA token (https://www.ncdc.noaa.gov/cdo-web/token)
 
 # INSTALLATION
   -From the root directory, run 
      `npm i` or `npm install`
   -To make the command available globally, run
      `npm i -g`

# USAGE
  -To enter your token via prompt, run
    `weather token`
  -To get summary of the weather, run
    `weather getSummary cityName, startDate, endDate`
  -For more information regarding usage, run
    `weather --help` 

 # TROUBLESHOOTING
  -If you are running into issues with your filesystem permissions, try running the following command from 
  the root directory
    chmod +x bin/getweather
  -For issues that may occur while running the CLI, run 
    `weather --help`
  

