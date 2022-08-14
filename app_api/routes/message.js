
var express = require('express')
var router = express.Router()
const ctrlMessage = require("../controllers/message")
router
.route('/getMessage')
.get(ctrlMessage.getMessage)

router
.route('/addMessage')
.post(ctrlMessage.addMessage)


module.exports = router;