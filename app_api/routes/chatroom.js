var express = require('express');
var router = express.Router();

const ctrlChatroom = require("../controllers/chatroom");



router
  .get('/chatroom', ctrlChatroom.getRecentConversation)
  .get('/chatroom/:roomId', ctrlChatroom.getConversationByRoomId)
  .post('/chatroom/initiate', ctrlChatroom.initiate)
  .post('/chatroom/:roomId/message', ctrlChatroom.postMessage)
  .put('/chatroom/:roomId/mark-read', ctrlChatroom.markConversationReadByRoomId)


module.exports = router;