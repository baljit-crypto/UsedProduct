const {sign,verify} = require("jsonwebtoken")
const mongoose = require('mongoose')
const  user = mongoose.model('user')

const createToken = (user) => {
    const access_token =  sign({email: user.email,_id: user._id},process.env.JWT_ACCESS_SECRET)
    return access_token
}


const validateToken = async (req,res,next) => {
    const accessToken = req.cookies["access-token"]
    if(!accessToken) return res.status(400).json({error:"User not Authenticated"})
    try{
        const valid_token = verify(accessToken,process.env.JWT_ACCESS_SECRET)
        if(valid_token){
            req.authenticated = true
            const User = await user.findOne({where: {_id: valid_token._id}})
            console.log(accessToken)
            return next()
        }
    }catch(err){
        console.log("not authenticated")
        return res.status(400).json({error: err})
    }
}





module.exports = {createToken,validateToken}