const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const path = require('path') // nodeJS module, not installed separately
const express = require('express')
const hbs = require('hbs')
// const { query } = require('express')

const port = process.env.PORT || 3000
const app = express()

// define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicPathDirectory = path.join(__dirname, '../public')   // server root, things that are to be served up stored here
// even if static files are not used, this is essential as all served up files will look for this as the source

// setup static directory to serve
app.use(express.static(publicPathDirectory)) // for static webpages

// setup handlebars engine and views location
app.set('view engine', 'hbs') // not static anymore
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mondeep'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mondeep'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        help: 'For further assistance, contact developer.',
        name: 'Mondeep'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    else{
        geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
            if (error) {
                // console.log('error: ', error)
                res.send({ error })
            }
            else forecast(longitude, latitude, (error, forecast) => {
                if (error) {
                    // console.log('error: ', error)
                    res.send({ error })
                }
                else {
                    res.send({
                        location,
                        forecast,
                        address: req.query.address
                    })
                //     console.log(location)
                //     console.log(forecast)
                }
            })
        })
    }

    // res.send({
    //     location: req.query.address,
    //     weather: 'boirhan disi'
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
        return res.send({
            error: 'enter query'
        })
    console.log(req.query.search)
    res.send({
        products:[] 
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help Page',
        errorMessage: 'Help article not available',
        name: 'Mondeep'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'Room No. 404',
        errorMessage: 'Occupied, Do not Disturb.',
        name: 'Mondeep'
    })
})

// app.com
// app.com/help
// app.com/about


app.listen(port, () => {
    console.log("\nExpress is running, Server is up at port "+port)
})






// app.get('', (req, res) => {
//     res.send("<h1>Weather</h1>")
// // })

// app.get('/help',(req,res)=>{
//     res.send([{
//             name: 'Mondeep',
//             age:22
//         },
//         {
//             name: 'Shreyashi',
//             age:21
//         }
//     ])
// })

// app.get('/about',(req,res)=>{
//     res.send("<h1>About Page</h1>")
// })