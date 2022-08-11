const mongoose = require('mongoose')
const  wishlist = mongoose.model('wishlist')

const getWishlist = function(req,res){
    wishlist.find({ user_id: req.user_id }).exec(function(err,data){
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

const createWishlist = function(req,res){
    const {createdAt,user_id,product_id} = req.body 
                wishlist.create({
                    createdAt: createdAt,
                    user_id: user_id,
                    product_id: product_id},(err,data) => {
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
              })
};


const deleteWishlist = function(req,res){
    // const {user_id,product_id} = req.params 
    const {user_id,product_id} = req.body 
    if(user_id && product_id){
        wishlist
        .findOneAndRemove({ user_id: user_id, product_id: product_id })
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
        .json({"message":"No wishlistid"});
    }
};


module.exports = {
    getWishlist,
    createWishlist,
    deleteWishlist
};