var express = require("express")
var app = express()
var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';


app.use('/',function(){
})


app.listen(server_port,server_host,() =>{
        console.log(`listening to port ${port}`)
})

module.exports = app;