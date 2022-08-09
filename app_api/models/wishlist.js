const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
            createdAt : {
                 type : Date, 
                 default: () => Date.now() 
            },
            user_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
             product_id:{
                type: mongoose.Schema.Types.ObjectId,
                 ref:'products'
            },       
})



 

mongoose.model('wishlist',wishlistSchema)