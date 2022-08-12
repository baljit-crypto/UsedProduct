const mongoose =require("mongoose")

const messageSchema = new mongoose.Schema({
    chatroom:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "chatroom"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    message:{
        type: String,
        required: true
    }

})

module.exports = mongoose.model("message",messageSchema)