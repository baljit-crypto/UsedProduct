var express = require("express")
var cors = require('cors')
const bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 5000
app.use(express.json())
 
app.use(bodyParser.json())
 
app.use(bodyParser.urlencoded({
    extended: true
}))
require('./app_api/models/db')

app.use(cors())
var productRouter = require('./app_api/routes/product')
var userRouter = require('./app_api/routes/user')

app.use('/api',productRouter)
app.use('/api',userRouter)


app.listen(port,() =>{
        console.log(`listening to port ${port}`)
})

module.exports = app;