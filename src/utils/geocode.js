const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9uZGVlcHByYWthc2gyMyIsImEiOiJja3FqaHQ1bXgwZm9tMm9wcW1zNm02b2d2In0.suLPHF036SW4DwF0Y4Tf6w&limit=1'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect, please check your internet.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to retrieve weather for given location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode