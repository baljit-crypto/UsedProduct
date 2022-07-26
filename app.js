var express = require("express")
var app = express()
var server_port = process.env.PORT || 5000;


app.use('/',function(){
})


app.listen(server_port,() =>{
        console.log(`listening to port ${port}`)
})

module.exports = app;