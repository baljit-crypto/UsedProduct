var express = require('express');
var router = express.Router();
const {validateToken} = require("../jwt")

const ctrlWishlist = require("../controllers/wishlist");

router
.route('/wishlist')
.get(validateToken, ctrlWishlist.getWishlist)
.post(ctrlWishlist.createWishlist)

router
.route('/wishlist/:productid')
.delete(ctrlWishlist.deleteWishlist)

module.exports = router;