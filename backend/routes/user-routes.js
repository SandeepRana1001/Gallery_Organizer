const express = require('express')
const { check } = require('express-validator')
const fileUpload = require('../middleware/file-upload')
const fileController = require('../controller/file-controller')
// const userController = require('../controller/user-controller')

const router = express.Router()

// router.post('/createAccount',
//     [
//         check('name').not().isEmpty(),
//         check('email').isEmail(),
//         check('password').isLength({ min: 6 })
//     ]
//     ,
//     userController.createAccount
// )
router.post('/upload', fileUpload.array('images', 10), fileController.uploadFile)

// router.post('/signIn'
//     ,
//     [
//         check('email').isEmail(),
//         check('password').not().isEmpty(),
//     ]
//     ,
//     userController.signIn
// )
module.exports = router