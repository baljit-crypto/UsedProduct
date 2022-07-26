var express = require("express")
var app = express()
var port = process.env.PORT || 5000

require('./app_api/models/db')
var productRouter = require('./app_api/routes/product')
app.use('/api',productRouter)


app.listen(port,() =>{
        console.log(`listening to port ${port}`)
})

module.exports = app;