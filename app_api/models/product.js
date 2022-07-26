const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
          name:{
                type: String,
                required: true
             },
          price:{
                type:String,
                required: true
            },
          img:{
              type:String,
              required: true
          },
          description:String,
          seller:{
            type: String,
            required:true
          },
          available:{
            type: Boolean,
            required:true
          } 
}); 



 

mongoose.model('products',productSchema);