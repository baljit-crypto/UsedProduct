const mongoose = require('mongoose');
const  Products = mongoose.model('products');

const getProductList = function(req,res){
    Products.find().exec(function(err,data){
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

const getSingleProduct = function(req,res){
    if(!req.params.productid){
        res
        .status(404)
        .json({
         "message":"Not Found, productid is required"
     })
     return;
    }
    Products
    .findById(req.params.productid)
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

const createProduct = function(req,res){
  Products.create({
      name:req.body.name,
      price:req.body.price,
      img:req.body.img,
      description:req.body.description,
      seller:req.body.seller,
      available:req.body.available
  },(err,data) => {
    if(err){
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
    }
  })
};

const updateProduct = function(req,res){ 
    if(!req.params.productid){
        res
        .status(404)
        .json({
            "message":"Not Found, productid is required"
        });
      return;  
    }
    Products.findById(req.params.productid)
        .exec((err,data) => {
            if(!data){
                res
                .status(404)
                .json({
                    "message":"productid not found"
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

const deleteProduct = function(req,res){
    const productid = req.params.productid;
    if(productid){
        Products
        .findByIdAndRemove(productid)
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
        .json({"message":"No productid"});
    }
};


module.exports = {
   getProductList,
   getSingleProduct,
   createProduct,
   updateProduct,
   deleteProduct
};