var express = require('express');
var router = express.Router();
var signupValidation = require('./validation')

const ctrlUser = require("../controllers/user");

router
.route('/user')
.get(ctrlUser.getUserList)
.post(ctrlUser.createUser)


router
.route('/user/:userid')
.get(ctrlUser.getSingleUser)
.put(ctrlUser.updateUser)
.delete(ctrlUser.deleteUser)

module.exports = router;