const {sign,verify} = require("jsonwebtoken")

const createToken = (user) => {
    const access_token =  sign({email: user.email,_id: user._id},process.env.JWT_ACCESS_SECRET)
    return access_token
}


const validateToken = (req,res,next) => {
    const accessToken = req.cookies["access-token"]
    if(!accessToken) return res.status(400).json({error:"User not Authenticated"})
    try{
        const valid_token = verify(accessToken,process.env.JWT_ACCESS_SECRET)
        if(valid_token){
            req.authenticated = true
            return next()
        }
    }catch(err){
        return res.status(400).json({error: err})
    }
}

module.exports = {createToken,validateToken}