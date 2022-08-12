const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
            createdAt : {
                 type : Date, 
                 default: () => Date.now() 
            },
            userid:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
             productid:{
                type: mongoose.Schema.Types.ObjectId,
                 ref:'products'
            },       
})



 

mongoose.model('wishlist',wishlistSchema)