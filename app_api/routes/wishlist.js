var express = require('express');
var router = express.Router();
const {validateToken} = require("../jwt")

const ctrlWishlist = require("../controllers/wishlist");

router
.route('/wishlist')
.post(ctrlWishlist.createWishlist)

router
.route('/wishlist/:wishlistid')
.delete(ctrlWishlist.deleteWishlist)

module.exports = router;