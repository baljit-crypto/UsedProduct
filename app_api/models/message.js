const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  roomId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chatroom'
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  userName:{
    type: String,
    required:true
  },      
  content:{
    type: String,
    required:true
  },      
  createdAt : {
    type : Date, 
    default: () => Date.now() 
  }
}); 

mongoose.model('message',messageSchema);

