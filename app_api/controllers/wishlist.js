const mongoose = require('mongoose')
const  wishlist = mongoose.model('wishlist')


const createWishlist = function(req,res){
    const {wish_product,createdAt,user_id,product_id} = req.body
                wishlist.create({wish_product: wish_product,
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
    const wishlistid = req.params.wishlistid;
    if(wishlistid){
        wishlist
        .findByIdAndRemove(wishlistid)
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
   createWishlist,
   deleteWishlist
};