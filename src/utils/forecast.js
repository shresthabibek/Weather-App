
const request = require("request")

const forecast = (latitude, longitude, callback) => {
    
    const url = "https://api.darksky.net/forecast/f4aa7565b88af980f809264604b850cc/" + latitude + "," + longitude

    request({url, json:true},(error, {body}) => { // shorthand syntax same name so we can only use one name
                                                    // response is replaced by body the only property of the response used
                                                    //destructured response 
                                                    // request({url:url, json:true},(error, response) => {})
        if(error){
            callback("Unable to connect to weather service", undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{
               callback(undefined,body.daily.data[0].summary + "It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.")
        }
    })
    
}


 
module.exports = forecast