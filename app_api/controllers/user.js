const mongoose = require('mongoose');
const  user = mongoose.model('user');

const getUserList = function(req,res){
    user.find().exec(function(err,data){
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

const getSingleUser = function(req,res){
    if(!req.params.userid){
        res
        .status(404)
        .json({
         "message":"Not Found, userid is required"
     })
     return;
    }
    user
    .findById(req.params.userid)
    .exec((err,data) => {
     if(err){
         res
         .status(404)
         .json(err)
       return;  
     }
     else{
     res
     .status(200)
     .json(data)
    } 
    });
}

const createUser = function(req,res){
  user.create({
      username:req.body.username,
      email:req.body.email,
      phone: req.body.phone,
      password: req.body.password
  },(err,data) => {
    if(err){
        if(err){
            res
            .status(404)
            .json(err)
          return;  
        }
        else{
        res
        .status(200)
        .json(data)
        }
    }
  })
};

const updateUser = function(req,res){ 
    if(!req.params.userid){
        res
        .status(404)
        .json({
            "message":"Not Found, userid is required"
        });
      return;  
    }
    user.findById(req.params.userid)
        .exec((err,data) => {
            if(!data){
                res
                .status(404)
                .json({
                    "message":"userid not found"
                })
                return;
            }else if(err){
                res
                .status(400)
                .json(err)
                return;
            }
            data.username = req.body.username;
            data.email = req.body.email;
            data.phone = req.body.phone;
            data.password = req.body.password;
            data.save((err, data) => {
                if(err){
                    res
                    .status(404)
                    .json(err)
                }
                else{
                    res
                    .status(200)
                    .json(data);
                }
            })
        })
};

const deleteUser = function(req,res){
    const userid = req.params.userid;
    if(userid){
        user
        .findByIdAndRemove(userid)
        .exec((err,data) => {
            if(err){
                res
                .status(404)
                .json(err)
              return;  
            }
            res
            .status(204)
            .json(null);
        });
    } else{
        res
        .status(404)
        .json({"message":"No userid"});
    }
};


module.exports = {
   getUserList,
   getSingleUser,
   createUser,
   updateUser,
   deleteUser
};