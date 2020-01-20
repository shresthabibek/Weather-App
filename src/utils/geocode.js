
const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2hyZXN0aGFiaWJlayIsImEiOiJjazRoeXIzcHcwNHllM3Fxc3pzbXM3bnQyIn0.siyqh76hTTB4E6nPomBVxw"

    request({url, json:true}, (error,{body}) => {
                                                    // shorthand syntax same name so we can only use one name
                                                    // response is replaced by body the only property of the response used
                                                    //destructured response  
                                                    // request({url:url, json:true},(error, response) => {})

        if(error){
            callback("Ubable to connect to location service", undefined)
        }else if(body.features.lenght === 0){
            callback("Unable to find locaiton. Try another search", undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    } )
}

module.exports = geocode