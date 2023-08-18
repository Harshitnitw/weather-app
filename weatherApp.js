const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())

const weatherApiEndpoint = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = 'b242a97921061a2bfb677a3873fdbd67'

async function getWeatherByCoords(latitude,longitude){
    try{
        const response = await axios.get(weatherApiEndpoint,{
            params:{
                lat:latitude,
                lon:longitude,
                appid:apiKey,
                units:'metric'
            }
        })

    const weather = response.data
    return weather
    } catch (error){
        throw new Error('Unable to fetch weather data.')
    }
}

app.post('/weather',async(req,res) =>{
    const {latitude,longitude} = req.body
    try{
        const weatherData = await getWeatherByCoords(latitude,longitude)
        const responseData = {
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description
        }
        res.json(responseData)
    } catch(error){
        res.status(500).json({error:'Unable to fetch weather data.'})
    }
})

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})