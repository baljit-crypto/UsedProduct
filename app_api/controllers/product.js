const mongoose = require('mongoose');
const Products = mongoose.model('products');
const Wishlist = mongoose.model('wishlist')

const getProductList = function(req,res){
    Products.find({ category: req.query.category }).exec(function(err,data){
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

const getPopProductList = function(req,res){
    Wishlist.aggregate().sortByCount("product_id").exec(function(err,pops){
        if(err){
            res
            .status(404)
            .json(err)
          return;  
        }
        
        const ids = pops.map(d => d._id).slice(0, 4);
        Products.find({ '_id': { $in: ids} }).exec(function(err,data){
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
    });
};

const getMyItems = function(req,res){
    Products.find({ seller: req.username }).exec(function(err,data){
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

        let wished = false;
        if (req.query.user_id){
            Wishlist.findOne({ user_id: req.query.user_id, product_id: req.params.productid }, function(err,result) { 
                if (result){
                    wished = true;
                }
                
                res
                .status(200)
                .json({
                    ...data._doc,
                    ...{ wished: wished }
                })
            })
        }else{
            res
            .status(200)
            .json({
                ...data._doc,
                ...{ wished: wished }
            })
    
        }

    }   
    });
}

const createProduct = function(req,res){
  Products.create({
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        images: req.files.images.map(f => ({ src: f.filename })),
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
        } else{
            res
            .status(200)
            .json(data)
            }
    } else {
        res
        .status(200)
        .json(data)
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
            data.category = req.body.category;
            data.price = req.body.price;
            data.description = req.body.description;

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

const updateProductAvailability = function(req,res){ 
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
   updateProductAvailability,
   deleteProduct,
   getMyItems,
   getPopProductList
};