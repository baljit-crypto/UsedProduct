const mongoose = require('mongoose');
const Chatroom = mongoose.model('chatroom');
const Message = mongoose.model('message')
const User = mongoose.model('user')

const getChatroomList = function(req,res){
    console.log("getChatroomListgetChatroomList");
    // Chatroom.findByIdAndRemove('62f7ed7bc1109bdd08164a64').exec((err,data) => {
    //     if(err){
    //         res
    //         .status(404)
    //         .json(err)
    //       return;  
    //     }
    //     res
    //     .status(204)
    //     .json(null);
    //     return
    // });

    Chatroom.find().exec(function(err,data){
        if(err){
            res
            .status(404)
            .json(err)
          return;  
        }
        res
        .status(200)
        .json(data)
    });
};

const getMessageList = async function(req,res){
    let userA;
    let userB;
    try {
        if (req.user_id < req.params.userId){
            userA = await User.findById(req.user_id);
            userB = await User.findById(req.params.userId);
        }else{
            userA = await User.findById(req.params.userId);
            userB = await User.findById(req.user_id);
        }
    }catch (err) {
        // no user id
        res
        .status(500)
        .json(err)
        return;  
    }

    
    Chatroom.findOne({ userAId: userA._id, userBId: userB._id })
    .exec((err,room) => {
        if(err){
            res
            .status(500)
            .json(err)
            return;  
        }

        if (!room){
            // First chat. Create new room 
            participants = [{
                username: userA.username,
            },{
                username: userB.username
            }]

            Chatroom.create({
                userAId: userA._id,
                userBId: userB._id,
                participants: participants
            },(err,newRoom) => {
                if (err){
                     res
                    .status(500)
                    .json(err)
                    return
                }

                res
                .status(200)
                .json({
                    roomId: newRoom._id,
                    participants: participants,
                    messages: []
                })

            })

        } else {

            // Already room exists.
            Message.find({ roomId: room._id }).exec(function(err,messages){
                if(err){
                    res
                    .status(500)
                    .json(err)
                  return;  
                }

                res
                .status(200)
                .json({
                    roomId: room._id,
                    participants: room.participants,
                    messages: messages
                })
                
            });

        }

        
    });
};

const createMessage = function(req,res){
    Message.create({
        roomId: req.body.roomId,
        userId: req.body.userId, 
        userName: req.body.userName, 
        content: req.body.content
    },(err,data) => {
        if(err){
            res
            .status(500)
            .json(err)
            return;  
        } 
        else{
            res.status(200).json(data);
        }
    });
};



module.exports = {
   getChatroomList,
   getMessageList,
   createMessage
};