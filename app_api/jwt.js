const {sign,verify} = require("jsonwebtoken")
const mongoose = require('mongoose')
const  user = mongoose.model('user')

const createToken = (user) => {
    const access_token =  sign({ username: user.username, _id: user._id },process.env.JWT_ACCESS_SECRET)
    return access_token
}


const validateToken = async (req,res,next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(400).json({error:"User not Authenticated"})
    }
    const accessToken = authHeader.substring(7, authHeader.length);
    try{
        const valid_token = verify(accessToken,process.env.JWT_ACCESS_SECRET)
        if(valid_token){
            req.authenticated = true
            req.user_id = valid_token._id
            req.username = valid_token.username
            return next()
        }
    }catch(err){
        return res.status(400).json({error: err})
    }
}





module.exports = {createToken,validateToken}