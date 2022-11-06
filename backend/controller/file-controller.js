const Gallery = require('../model/gallery-model')
const Folder = require('../model/folder-model')
const HttpError = require('../middleware/http-error');
const mongoose = require('mongoose');
const fs = require('fs')


const uploadFile = async (req, res, next) => {
    console.clear()
    console.log(req.body)
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        console.log(req.files[i])

        const obj = new Gallery({
            backend_name: req.files[i].filename,
            displayName: req.files[i].originalname,
            parent: req.body.parent,
            url: url + '/images/gallery/' + req.files[i].filename,
            creator: req.body.id
        });

        await obj.save()
    }

    return res.status(200).json({ status: 'success' })
}

const getData = async (req, res, next) => {

    const id = req.params.id
    let data, folder_data;
    try {
        data = await Gallery.find({})
        folder_data = await Folder.find({ id })
    } catch (err) {
        return next(err)
    }

    data = data.filter((element) => {
        return element.creator.valueOf() === id
    })


    res.status(200).json({
        data,
        folders: folder_data
    })
}


const deleteImage = async (req, res, next) => {

    const files = req.body.files
    const folders = req.body.folders
    let existingFile, existingFolder;

    let imagePath;

    if (files.length === 0 && folders.length === 0) {
        console.log('This works')
        return next({
            msg: 'Invalid Input Passsed',
            status: 422
        })
    }

    if (files.length > 0) {


        files.forEach(async (fileId) => {
            try {
                existingFile = await Gallery.findOne({ _id: fileId })
            } catch (err) {
                // const error = new HttpError('Something went wrong. Cannot Remove Item' + err, 500)
                return next({
                    msg: 'Something went wrong',
                    status: 500
                })
            }
            if (!existingFile) {
                const error = new HttpError('Something went wrong. Cannot Remove Item', 500)
                return next(error)
            }
            imagePath = ''
            imagePath = 'images/gallery/' + existingFile.backend_name

            try {
                const sess = await mongoose.startSession()
                sess.startTransaction()
                await existingFile.remove({ session: sess })
                await sess.commitTransaction()

            } catch (err) {
                const error = new HttpError('Something went wrong. Cannot Remove Item' + err, 500)
                return next(error)
            }

            fs.unlink(imagePath, (err) => {
                console.clear()
                console.log(err)
            })

        })
    }

    if (folders.length > 0) {

        folders.forEach(async (folderId) => {
            try {
                existingFolder = await Folder.findOne({ _id: folderId })
            } catch (err) {
                return next(new HttpError(err, 500))
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

            /* Remove images inside the folder */

            try {
                existingFile = await Gallery.find({ parent: folderId })
            } catch (err) {
                // const error = new HttpError('Something went wrong. Cannot Remove Item' + err, 500)
                return next({
                    msg: 'Something went wrong',
                    status: 500
                })
            }


            existingFile.forEach(async (existingFile) => {


                imagePath = ''
                imagePath = 'images/gallery/' + existingFile.backend_name

                try {
                    const sess = await mongoose.startSession()
                    sess.startTransaction()
                    await existingFile.remove({ session: sess })
                    await sess.commitTransaction()

                } catch (err) {
                    const error = new HttpError('Something went wrong. Cannot Remove Item' + err, 500)
                    return next(error)
                }

                fs.unlink(imagePath, (err) => {
                    console.log(err)
                })
            })


        })
    }


    return res.status(200).json({ success: 'Removed' })
}

const updateParent = async (req, res, next) => {

    const files = req.body.files
    const folders = req.body.folders
    const parent = req.body.parent
    let existingFile, existingFolder;


    if (files.length === 0 && folders.length === 0) {
        return next({
            msg: 'Invalid Input Passsed',
            status: 422
        })
    }

    if (files.length > 0) {


        files.forEach(async (fileId) => {
            try {
                existingFile = await Gallery.findOne({ _id: fileId })
            } catch (err) {
                // const error = new HttpError('Something went wrong. Cannot Remove Item' + err, 500)
                return next({
                    msg: 'Something went wrong',
                    status: 500
                })
            }
            if (!existingFile) {
                const error = new HttpError('Something went wrong. Cannot Find File', 500)
                return next(error)
            }

            existingFile.parent = parent;

            try {
                await existingFile.save()

            } catch (err) {
                const error = new HttpError('Something went wrong. Cannot Save File' + err, 500)
                return next(error)
            }


        })
    }

    if (folders.length > 0) {

        folders.forEach(async (folderId) => {
            try {
                existingFolder = await Folder.findOne({ _id: folderId })
            } catch (err) {
                return next(new HttpError(err, 500))
            }

            if (!existingFolder) {
                const error = new HttpError('Something went wrong. Cannot Find  Folder', 500)
                return next(error)
            }


            existingFolder.parent = parent;

            try {
                await existingFolder.save()

            } catch (err) {
                const error = new HttpError('Something went wrong. Cannot Save Folder' + err, 500)
                return next(error)
            }


        })
    }


    return res.status(204).json({ success: 'Successfully Updated' })
}



exports.uploadFile = uploadFile
exports.getData = getData
exports.deleteImage = deleteImage
exports.updateParent = updateParent


