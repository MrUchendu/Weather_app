const request = require('request')

const forcast = (latitude,longitude,callback)=>{
 const url='https://api.darksky.net/forecast/ee3e044adb28e884ab7f11b2d3429190/' + latitude +','+ longitude

 request({url,json:true},(error,{body}={})=>{
    if (error){
        callback('Unable to connect to the internet!',undefined)
    }else if (body.error){
        callback('Unable to get forcast!',undefined)
    }else{
        callback(undefined,
            'The weather is ' + body.currently.summary+'. It is currently '+ body.currently.temperature +' degrees out, and there is ' + body.currently.precipProbability +'% chance of rain '
        
    )

}
 })
}

module.exports = forcast