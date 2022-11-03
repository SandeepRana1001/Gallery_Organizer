const express = require('express')
const { check } = require('express-validator')
const folderContoller = require('../controller/folder-controller')

const router = express.Router()

router.post('/newFolder',
    [
        check('name').isLength({ min: 3 }),
        check('parent').not().isEmpty(),
    ],
    folderContoller.newFolder)

// router.delete('/deleteData', folderContoller.deleteFolder)

module.exports = router