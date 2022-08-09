const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
          },
          available:{
            type: Boolean,
            required:true
          } 
}); 



 

mongoose.model('myItems',itemSchema);