const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  src: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
          name:{
                type: String,
                required: true
             },
          category:{
                type: String,
                required: true
             },
          price:{
                type:String,
                required: true
            },
          images: [imageSchema],
          description:String,
          seller:{
            type: String,
            required:true
          },
          userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
          },
          available:{
            type: Boolean,
            required:true
          },
          createdAt : {
            type : Date, 
            default: () => Date.now() 
        }
}); 



 

mongoose.model('products',productSchema);