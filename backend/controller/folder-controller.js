const Folder = require('../model/folder-model')
const HttpError = require('../middleware/http-error');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const checkDuplicates = async (data) => {
    let existingFolder = 1, i = 1, newName = data.name;

    while (existingFolder != 0) {
        let temp = await Folder.countDocuments({ name: newName, parent: data.parent })
        if (temp > 0) {
            const str = newName.split('(')
            if (str.length > 1) {
                const num = parseInt(str[1].replace(')', '')) + 1
                newName = data.name + ' (' + num + ')'
            } else {
                newName = newName + ' (' + i + ')'
            }
        }

        console.log(`${temp} is Temp for ${newName} `)
        if (temp == 0) existingFolder = 0
        i++
    }


    return newName


}

const newFolder = async (req, res, next) => {
    console.log(req.body)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed , please check your Data ', 422))
    }

    const { name, parent, creator } = req.body


    const data = { name, parent }
    const newName = await checkDuplicates(data)

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


exports.newFolder = newFolder