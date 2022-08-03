const {check} = require('express-validator')


exports.signupValidation = [
    check('username', 'username is requied').not().isEmpty(),
    check('email', 'Please include a valid email').not().isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('phone','phone number is required').not().isEmpty().isInt().isLength({min:10,max:10}),
    check('password', 'Password must be 6 or more characters').not().isEmpty().isLength({ min: 6 })
]