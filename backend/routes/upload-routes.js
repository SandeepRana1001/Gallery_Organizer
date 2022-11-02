const express = require('express')
const { check } = require('express-validator')
const fileUpload = require('../middleware/file-upload')
const fileController = require('../controller/file-controller')

const router = express.Router()

router.get('/:id', fileController.getData)


router.post('/uploadData', fileUpload.array('images', 10), fileController.uploadFile)

router.delete('/deleteData', fileController.deleteImage)


module.exports = router