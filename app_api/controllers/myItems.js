const mongoose = require('mongoose');
const  myItems = mongoose.model('myItems');

const getMyItemsList = function(req,res){
    myItems.find().exec(function(err,data){
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

const getSingleMyItem = function(req,res){
    if(!req.params.myItemsid){
        res
        .status(404)
        .json({
         "message":"Not Found, myItemsid is required"
     })
     return;
    }
    myItems
    .findById(req.params.myItemsid)
    .exec((err,data) => {
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
    });
}

const createMyItem = function(req,res){
  myItems.create({
      name:req.body.name,
      price:req.body.price,
      img:req.body.img,
      description:req.body.description,
      seller:req.body.seller,
      available:req.body.available
  },(err,data) => {
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

const updateMyItem = function(req,res){ 
    if(!req.params.myItemsid){
        res
        .status(404)
        .json({
            "message":"Not Found, myItemsid is required"
        });
      return;  
    }
    myItems.findById(req.params.myItemsid)
        .exec((err,data) => {
            if(!data){
                res
                .status(404)
                .json({
                    "message":"myItemsid not found"
                })
                return;
            }else if(err){
                res
                .status(400)
                .json(err)
                return;
            }
            data.name = req.body.name;
            data.price = req.body.price;
            data.img = req.body.img;
            data.description = req.body.description;
            data.seller = req.body.seller;
            data.available = req.body.available;
            data.save((err, data) => {
                if(err){
                    res
                    .status(404)
                    .json(err)
                }
                else{
                    res
                    .status(200)
                    .json(data);
                }
            })
        })
};

const deleteMyItem = function(req,res){
    const myItemsid = req.params.myItemsid;
    if(myItemsid){
        myItems
        .findByIdAndRemove(myItemsid)
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
        .json({"message":"No myItemsid"});
    }
};


module.exports = {
   getMyItemsList,
   getSingleMyItem,
   createMyItem,
   updateMyItem,
   deleteMyItem
};