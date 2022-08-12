var http = require("http")
var express = require("express")
var cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var app = express()
var path = require('path');
var mime = require('mime');
var logger = require("morgan");
var {Server} = require('socket.io')
var websockets = require("./utils/websocket")

require('dotenv').config()
var port = process.env.PORT || 5000

 
// app.use(bodyParser.urlencoded({
//     extended: true
// }))
// app.use(bodyParser.json())

app.use(express.json())
app.use(cookieParser())
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, 'uploads')));

require('./app_api/models/db')

app.use(cors())
var productRouter = require('./app_api/routes/product')
var userRouter = require('./app_api/routes/user')
var wishlistRouter = require('./app_api/routes/wishlist')
var myproductRouter = require('./app_api/routes/myItems')
var chatroomRouter = require('./app_api/routes/chatroom')
var deleteRouter = require('./app_api/routes/delete.js')
app.use('/api',userRouter)
app.use('/api',wishlistRouter)
app.use('/api',myproductRouter)
app.use('/api',chatroomRouter)
app.use('/api',deleteRouter)

/* Image upload  */
const multer  = require('multer')
var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                cb(null, uniqueSuffix + '.' + mime.getExtension(file.mimetype));
        }
      });
var upload = multer({ storage: storage }).fields([{ name: 'images' }])
app.post('/api/product', function (req, res) {
        upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                        // console.log("A Multer error occurred when uploading.", err);
                } else if (err) {
                        // console.log("An unknown error occurred when uploading.", err);
                }else {
                        // console.log("Everything went fine");
                        const ctrlProduct = require("./app_api/controllers/product");
                        ctrlProduct.createProduct(req, res);
                }
        })
})
/* End of Image upload ----- */

app.use('/api',productRouter)   // Should be after the `app.post('/api/product',  .... `


const  server = http.createServer(app)
global.io = new Server(server)
global.io.on('connection',websockets.connection)
server.listen(port)     

server.on("listen",() =>{
        console.log(`listening to port ${port}`)
})
module.exports = app;