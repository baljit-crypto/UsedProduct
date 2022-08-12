var express = require('express');
var router = express.Router();

const deleteController = require("../controllers/delete");



router
  .delete('/delete/room/:roomId', deleteController.deleteRoomById)
  .delete('/delete/message/:messageId', deleteController.deleteMessageById)


module.exports = router;