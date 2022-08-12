var express = require('express');
var router = express.Router();
const {validateToken} = require("../jwt")

const ctrlUser = require("../controllers/user");


router
.route('/profile')
.get(validateToken, ctrlUser.getProfile)

router
.route('/signin')
.post(ctrlUser.signinUser)

router
.route('/signup')
.post(ctrlUser.createUser)


router
.route('/user/:userid')
.put(ctrlUser.updateUser)
.delete(ctrlUser.deleteUser)

module.exports = router;