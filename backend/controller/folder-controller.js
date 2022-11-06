const Folder = require('../model/folder-model')
const HttpError = require('../middleware/http-error');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const checkDuplicates = require('../globalFunction/check-duplicate')

const newFolder = async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed , please check your Data ', 422))
    }

    const { name, parent, creator } = req.body


    const data = { name, parent }
    const newName = await checkDuplicates.checkDuplicates(data, 'folder')

    const newFolder = new Folder({
        name: newName,
        parent,
        creator
    })


    try {
        await newFolder.save()
    } catch (err) {
        const error = new HttpError('Cannot Save the user record' + err, 500)
        return next(error)
    }


    res.status(201).json({ folder: newFolder })
}

const deleteFolder = async (req, res, next) => {

    if (!res.body.folders) {
        return next('No value provided')

    }

    const folders = req.body.folders;
    let existingFolder;

    folders.map(async (id) => {
        try {
            existingFolder = await Folder.find({ id: id })
        } catch (err) {
            return next(err)
        }
        try {
            const sess = await mongoose.startSession()
            sess.startTransaction()
            await existingFolder.remove({ session: sess })
            await sess.commitTransaction()

        } catch (err) {
            const error = new HttpError('Something went wrong. Cannot Remove Item' + err, 500)
            return next(error)
        }
    })

    return res.status(200).json({ success: 'Removed' })
}

exports.newFolder = newFolder
// exports.deleteFolder = deleteFolder