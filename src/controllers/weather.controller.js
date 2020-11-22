const { OK, INTERNAL_SERVER_ERROR } = require('http-status')
const https = require("https");
const { success } = require('../middlewares/success.middleware')
const { error } = require('../middlewares/error.middleware')
const { API_KEY } = require('../config/vars')

const getWeatherByCords = async (req, res) => {

    try {
        const {  lat, lon  } = req.params;
        const units = "metric"
        const url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=${units}&lat=${lat}&lon=${lon}&lang=es`
     
        https.get(url, (response) => {
            response.on("data", (data) => {
        
              const weatherData = JSON.parse(data)
              const weatherReponse = {
        
                cityName : weatherData.name,
                description : weatherData.weather[0].description,
                tempt : {
                  temperature : weatherData.main.temp,
                  feelsLike : weatherData.main.feels_like,
                  temp_min : weatherData.main.temp_min,
                  temp_max : weatherData.main.temp_max,
                  pressure : weatherData.main.pressure,
                  humidity : weatherData.main.humidity,
                },
                wind :{
                  windSpeed : weatherData.wind.speed,
                  windDirection : weatherData.wind.deg,
                },
              }
        
              const icon = weatherData.weather[0].icon
              //Link que muestra un icono con el clima correspondiente a las coordenadas
              weatherReponse.temptImage = "https://openweathermap.org/img/wn/" + icon +  "@2x.png"
        
        
              res.status(OK).json(success(weatherReponse))
            })
        
          });
       
      
    } catch (err) {
        console.log(err)
        res.status(INTERNAL_SERVER_ERROR).json(error('No se puede obtener clima', INTERNAL_SERVER_ERROR))
    }

}

module.exports = {
    getWeatherByCords
}