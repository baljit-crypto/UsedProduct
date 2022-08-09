var express = require("express")
var cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var app = express()
require('dotenv').config()
var port = process.env.PORT || 5000

 
// app.use(bodyParser.urlencoded({
//     extended: true
// }))
// app.use(bodyParser.json())

app.use(express.json())
 app.use(cookieParser())
require('./app_api/models/db')

app.use(cors())
var productRouter = require('./app_api/routes/product')
var userRouter = require('./app_api/routes/user')
var wishlistRouter = require('./app_api/routes/wishlist')

app.use('/api',productRouter)
app.use('/api',userRouter)
app.use('/api',wishlistRouter)

app.listen(port,() =>{
        console.log(`listening to port ${port}`)
})

module.exports = app;