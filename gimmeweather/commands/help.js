const menus = {
  main: `
    **GIMME-WEATHER**

    weather [command]
    
      getSummary city_name, start_date, end_date .............. shows a prompt for the user to enter an NOAA token
      token ........... provide a token for use
      --help ............... show help menu for a command

    DESCRIPTION: the getSummary command returns the daily weather summaries for a city within a specified date 
    period (one to three days). ALL arguments are required and must be separated by a comma (,). Data is provided
    courtesy of the National Oceanic and Atmospheric Administration. Aditional information can be found at
    https://www.ncdc.noaa.gov.

    ----------------------------------------------------------------------------------------------------------
    **COMMANDS**

    weather getSummary city_name, start_date, end_date

      city_name, ..... the name of the city, case-insensitive
      start_date, ..... the period start date, must be in YYYY-MM-DD format
      end_date ..... the period end date, must be in YYYY-MM-DD format
    
    weather token 
      token ..... the user's NOAA token. Token's can be requested at https://www.ncdc.noaa.gov/cdo-web/token
                and will be delivered via email.
                
    weather --help Prints the synopsis and a list of the most commonly used commands.
    
    ***
    END OF OUTPUT
    ***`
  }


module.exports = () => {
  console.log(menus.main)
}