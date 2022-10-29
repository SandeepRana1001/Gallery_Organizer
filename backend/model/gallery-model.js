const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    displayName: { required: true, type: String },
    backend_name: { required: true, type: String },
    url: { required: true, type: String },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})


module.exports = mongoose.model('Gallery', gallerySchema)