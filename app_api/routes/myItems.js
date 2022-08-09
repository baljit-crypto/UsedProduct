var express = require('express');
var router = express.Router();

const ctrlMyItems = require("../controllers/myItems");

router
.route('/myproduct')
.get(ctrlMyItems.getMyItemsList)
.post(ctrlMyItems.createMyItem);


router
.route('/myproduct/:myproductid')
.get(ctrlMyItems.getSingleMyItem)
.put(ctrlMyItems.updateMyItem)
.delete(ctrlMyItems.deleteMyItem)

module.exports = router;