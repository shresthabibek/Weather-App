const express = require("express")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const path = require("path")
const hbs = require("hbs")

const app = express()
const address = process.argv[2]

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views") //Setting the path to templetes 
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine 
app.set("view engine", "hbs")
app.set("views", viewsPath) //Doing so we can name the views to templates 
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))




app.get("/", (req, res) => {
    res.render("index",{
        title: "Weather App",
        name: "Bibek Shrestha"
    })
})

app.get("/weather", (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { // Destructuring and shorthanded (error, data) accessing was data.location

        if(error){
            return res.send({ error })
            
        }
    
        forecast(latitude,longitude, (error,forecastData) => { // data.longitude replaced with longitude
            if(error){
                return res.send({ error })
            }
    
           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })
        })
        
    })

    // res.send({
    //     forecast: "It is snowing",
    //     location: "Monroe",
    //     address: req.query.address
    // })
})

app.get("/about", (req,res) => {
    res.render("about",{
        title: "About Me",
        name: "Bibek Shrestha"
    })
})


app.get("/help", (req, res) => {
    res.render("help",{
        helpText: "This is some helpful text",
        title: "Help",
        name: "Bibek Shrestha"
    })
})

app.get("/help/*", (req,res) => {
    res.render("404",{
        title: "404",
        name: "Bibek Shrestha",
        errorMessage: "Help article not found"
    })
})

app.get("*", (req,res) => {
    res.render("404",{
        title: "404",
        name: "Bibek Shrestha",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("Server has started")
})



