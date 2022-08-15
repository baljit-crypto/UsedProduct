const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  username: { type: String, required: true }
});

const chatroomSchema = new mongoose.Schema({
    userAId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    userBId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    participants: [participantSchema],
    createdAt : {
        type : Date, 
        default: () => Date.now() 
    }
}); 

mongoose.model('chatroom', chatroomSchema);