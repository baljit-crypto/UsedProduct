var express = require('express');
var router = express.Router();
const {validateToken} = require("../jwt")

const ctrlMessage = require("../controllers/message");

router
.route('/chatrooms')
.get(ctrlMessage.getChatroomList)

router
.route('/chatrooms/:userId')
.get(validateToken, ctrlMessage.getMessageList)

router
.route('/chatrooms/:roomId')
.post(validateToken, ctrlMessage.createMessage)
.delete(ctrlMessage.deleteRoom)


module.exports = router;