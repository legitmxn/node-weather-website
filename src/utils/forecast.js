const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8ae81298d9b4a759e9971d82754d607c&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error,{body}= {} ) => {
        if (error) {
            callback('check your internet', undefined)
        } else if (body.error) {
            callback('unable to retrieve data', undefined)
        } else {
            callback(undefined, 'Weather Conditions: ' + body.current.weather_descriptions[0] + '. Temperature: ' + body.current.temperature + ' degrees, Feels like: ' + body.current.feelslike + ' degrees, Rainfall: ' + body.current.precip + 'mm, Humidity: ' + body.current.humidity + '%')
        }
    })
}

module.exports = forecast