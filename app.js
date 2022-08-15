var express = require("express")
var cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var app = express()
var path = require('path');
require('dotenv').config()
var port = process.env.PORT || 5000

 
// app.use(bodyParser.urlencoded({
//     extended: true
// }))
// app.use(bodyParser.json())

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'uploads')));

require('./app_api/models/db')

app.use(cors())
var productRouter = require('./app_api/routes/product')
var userRouter = require('./app_api/routes/user')
var wishlistRouter = require('./app_api/routes/wishlist')
var myproductRouter = require('./app_api/routes/myItems')
var messageRouter = require('./app_api/routes/message')

app.use('/api',userRouter)
app.use('/api',wishlistRouter)
app.use('/api',myproductRouter)
app.use('/api',messageRouter)

/* Image upload  */
// const multer  = require('multer')
// var storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//           cb(null, './uploads/')
//         },
//         filename: function (req, file, cb) {
//                 const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//                 cb(null, uniqueSuffix + '.' + mime.getExtension(file.mimetype));
//         }
//       });
// var upload = multer({ storage: storage }).fields([{ name: 'images' }])
// app.post('/api/product', function (req, res) {
//         upload(req, res, function (err) {
//                 if (err instanceof multer.MulterError) {
//                         // console.log("A Multer error occurred when uploading.", err);
//                 } else if (err) {
//                         // console.log("An unknown error occurred when uploading.", err);
//                 }else {
//                         // console.log("Everything went fine");
//                         const ctrlProduct = require("./app_api/controllers/product");
//                         ctrlProduct.createProduct(req, res);
//                 }
//         })
// })

/* AWS S3 */

const multer  = require('multer')
var upload = multer({ dest: 'temp/', limits: { fileSize: 1 * 1024 * 1024 } }).fields([{ name: 'images' }])
app.post('/api/product', function (req, res) {
        upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                        console.log("A Multer error occurred when uploading.", err);
                        res
                        .status(500)
                        .json({ error: err })
                        return;  
                } else if (err) {
                        console.log("An unknown error occurred when uploading.", err);
                        res
                        .status(500)
                        .json({ error: err })
                        return;  
                } else {
                        // console.log("Everything went fine");
                        const ctrlProduct = require("./app_api/controllers/product");
                        ctrlProduct.createProduct(req, res);
                }
        })
})
/* End of Image upload ----- */

app.use('/api',productRouter)   // Should be after the `app.post('/api/product',  .... `

app = app.listen(port,() =>{
        console.log(`listening to port ${port}`)
})


/* Websocket*/
const { WebSocketServer } = require('ws');
const WebSocket = require('ws');
const wss = new WebSocketServer({ server: app });

wss.on('connection', function (ws) {
  ws.on('message', function message(data, isBinary) {
    const json = JSON.parse(data);
    if (json.type == 'init'){
        // console.log("initt____roomId", json.roomId);
        ws.roomId = json.roomId;
    }
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN && client.roomId == json.roomId) {
        client.send(data, { binary: isBinary });
      }
    });
  });


  ws.on('close', function () {
    console.log('stopping client interval');
    // clearInterval(id);
  });
});
/* End of Websocket ----- */



module.exports = app;