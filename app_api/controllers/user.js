const mongoose = require('mongoose')
const  user = mongoose.model('user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const brcypt = require("bcryptjs")
const {createToken} = require("../jwt")



const signinUser =async function(req,res){
    const {email,password} = req.body
    const User = await user.findOne({ email: email })
    if(!User) res.status(400).json({error:"User doesn't exist"})
    const dbPassword = User.password
    brcypt.compare(password,dbPassword).then((match) => {
        if(match){
            const accessToken = createToken(User)
            res.status(200).json({ 
                _id: User._id,
                username: User.username,
                email: User.email,
                phone: User.phone,
                accessToken: accessToken
            })
        }else{
            res.status(400)
            .json({error:"wrong username and password combinations"})
        }
    })
   
  };

const createUser = function(req,res){
    const {username,email,phone,password} = req.body
    brcypt.genSalt(10,function(err,salt){
        brcypt.hash(password,salt,function(err,hash){
            user.create({username: username,
                email: email,
                phone: phone,
                password: hash},(err,data) => {
                if(err){
                    res
                    .status(404)
                    .json(err)
                    return;  
                } 
                else{
                    const accessToken = createToken(data)
                    res.status(200).json({ 
                        _id: data._id,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        accessToken: accessToken
                    })
                }
            })
        })
    })
       

};

const getProfile = (req,res) => {
        res.json("profile")
}   

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
   createUser,
   updateUser,
   deleteUser,
   signinUser,
   getProfile
};