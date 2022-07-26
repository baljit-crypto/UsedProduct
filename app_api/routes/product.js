var express = require('express');
var router = express.Router();

const ctrlProduct = require("../controllers/products");

router
.route('/product')
.get(ctrlProduct.getProductList)
.post(ctrlProduct.createProduct);


router
.route('/product/:productid')
.get(ctrlProduct.getSingleProduct)
.put(ctrlProduct.updateProduct)
.delete(ctrlProduct.deleteProduct)

module.exports = router;