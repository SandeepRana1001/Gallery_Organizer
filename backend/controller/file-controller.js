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
        console.log('Error is')
        console.log(err)
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

    console.clear();
    const files = req.body.files
    let existingImage;
    console.log(files)
    let imagePath;
    files.forEach(async (imageId) => {
        try {
            existingImage = await Gallery.findOne({ _id: imageId })
        } catch (err) {
            const error = new HttpError('Something went wrong. Cannot Remove Item' + err, 500)
            return next(error)
        }
        if (!existingImage) {
            const error = new HttpError('Something went wrong. Cannot Remove Item', 500)
            return next(error)
        }
        imagePath = ''
        imagePath = 'images/gallery/' + existingImage.backend_name

        try {
            const sess = await mongoose.startSession()
            sess.startTransaction()
            await existingImage.remove({ session: sess })
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

    return res.status(200).json({ success: 'Removed' })
}

exports.uploadFile = uploadFile
exports.getData = getData
exports.deleteImage = deleteImage


