const multer = require('multer')
const path = require("path")
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
let fileUpload;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/gallery')
    },
    filename: function (req, file, cb) {
        let fileName = file.fieldname + "-" + uuidv4()
        const Imagepath = 'images/gallery/' + fileName
        if (fs.existsSync(Imagepath)) {
            fileName = fileName + Date.now()
        }
        fileName = fileName + path.extname(file.originalname)


        cb(null, fileName);
    },
})
fileUpload = multer({
    limit: 500000,
    storage
});
module.exports = fileUpload;


