const Gallery = require('../model/gallery-model')
const HttpError = require('../middleware/http-error');
const mongoose = require('mongoose');
const fs = require('fs')


const uploadFile = async (req, res, next) => {

    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        console.log(req.files[i])

        const obj = new Gallery({
            backend_name: req.files[i].filename,
            displayName: req.files[i].originalname,
            url: url + '/images/gallery/' + req.files[i].filename
        });

        await obj.save()
    }

    return res.status(200).json({ status: 'success' })
}

const getData = async (req, res, next) => {
    const data = await Gallery.find({})

    res.status(200).json({
        data
    })
}


const deleteImage = async (req, res, next) => {

    const { imageTitle, imageId } = req.body

    let imagePath = 'images/gallery/' + imageTitle
    fs.unlink(imagePath, (err) => {
        console.clear()
        console.log(err)
    })

    let existingImage;

    try {
        existingImage = await Gallery.findOne({ _id: imageId })
    } catch (err) {
        const error = new HttpError('Something went wrong. Cannot Remove Item' + err, 500)
        return next(error)
    }
    if (!existingImage) {
        const error = new HttpError('Something went wrong. Cannot Remove Item' + err, 500)
        return next(error)
    }

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await existingImage.remove({ session: sess })
        await sess.commitTransaction()

    } catch (err) {
        const error = new HttpError('Something went wrong. Cannot Remove Item' + err, 500)
        return next(error)
    }

    return res.status(200).json({ success: 'Removed' })
}

exports.uploadFile = uploadFile
exports.getData = getData
exports.deleteImage = deleteImage


