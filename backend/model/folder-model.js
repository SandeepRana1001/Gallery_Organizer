const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const folderSchema = new Schema({
    name: { required: true, type: String },
    parent: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})


module.exports = mongoose.model('Folder', folderSchema)