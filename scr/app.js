const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000

const publicpath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname, '../template/views')
const partialpath = path.join(__dirname,'../template/partials')

app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)
app.use(express.static(publicpath))

app.get('/',(req, res)=>{
    res.render('index',{
        name:'Kings',
        title:'Weather'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:"About",
        name:"Kingsley Uchendu"
    })
})
app.get('/help',(rea, res)=>{
    res.render('help',{
        title:"Help",
        name:"Kingsley Uchendu"
    })
})
app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send('Please provide an address!')
    }
    const address = (req.query.address)
    
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})
        }else{
    
            forcast(latitude,longitude,(error,forcastData)=>{
                if (error){
                    return res.send({error})
                }
                
                res.send({
                    Address:req.query.address,
                    Forcast:forcastData,
                location})
            })
        }
    })
})
app.get('/help/*',(req, res)=>{
    res.render('4041',{
        title:"Help Article not found",
        name:"Uchendu Kingsley"
    })
})
app.get('*',(req, res)=>{
    res.render('404',{
        title:"Page not found",
        name:"Uchendu Kingsley"
    })
})
// app.get('/Services',(req, res)=>{
//     res.send('<h1>Services</h1>')
// })


app.listen(port, ()=>{
    console.log('Server is up on port' + port)
})


