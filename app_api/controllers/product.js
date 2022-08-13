const mongoose = require('mongoose');
const Products = mongoose.model('products');
const Wishlist = mongoose.model('wishlist')

const aws = require('aws-sdk');
const fs = require('fs');
var mime = require('mime');
const { reject } = require('lodash');

const getProductList = function(req,res){
    limit = 50
    if (req.query.limit){
        limit = req.query.limit
    }
    Products.find({ category: req.query.category }).limit(limit).exec(function(err,data){
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
    Wishlist.aggregate().sortByCount("product_id").limit(4).exec(function(err,pops){
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

const s3upload = (f, resolve, reject) => {
    const s3 = new aws.S3();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // mime.getExtension(file.mimetype)
    var params = {
        ACL: 'public-read',
        Bucket: process.env.S3_BUCKET,
        Body: fs.createReadStream(f.path),
        Key: `image/${uniqueSuffix}${f.originalname}`,
        ContentType: f.mimetype
      };
  
      s3.upload(params, (err, data) => {
        if (err) {
          console.log('Error occured while trying to upload to S3 bucket', err);
          reject(err)
        }
  
        if (data) {
          fs.unlinkSync(f.path); // Empty temp folder
          const imageUrl = data.Location;
          resolve({ src: imageUrl })
        }
      });
}

const createProduct = function(req,res){
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-west-1'
    });
    const uploaders = req.files.images.map(f => {
        return new Promise((resolve, reject) => {
            s3upload(f, resolve, reject);
        });
      })
  
      Promise.all(uploaders).then((resolves) => {
        const imageUrls = resolves.map(r => r.src)
        Products.create({
            name:req.body.name,
            category:req.body.category,
            price:req.body.price,
            images: imageUrls.map(url => {
                return {
                    src: url
                };
            }),
            description:req.body.description,
            userId: req.user_id,
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



      }).catch(err => {
        res
        .status(500)
        .json({error: err})
      });



        

    
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