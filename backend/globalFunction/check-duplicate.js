const Gallery = require('../model/gallery-model')
const Folder = require('../model/folder-model')

const checkDuplicates = async (data, type = 'folder') => {
    let existingRecord = 1, i = 1, newName = data.name, count = 0;

    while (existingRecord != 0) {
        if (type === 'file') {
            count = await Gallery.countDocuments({ displayName: newName.toLowerCase(), parent: data.parent })
        } else if (type === 'file_backend') {
            count = await Gallery.countDocuments({ backend_name: data.fileName, parent: data.parent })

        } else {
            count = await Folder.countDocuments({ name: newName, parent: data.parent })
        }
        if (count > 0) {
            const temp_split = newName.split('(');
            if (temp_split.length > 1) {
                const second_temp_split = parseInt(temp_split[1].replace(')', '')) + 1
                newName = data.name + ' (' + second_temp_split + ')'
            } else {
                newName = data.name + ' (' + parseInt(count).toString() + ')'
            }
        } else {
            existingRecord = 0
        }
    }
    return newName.toLowerCase()


}

exports.checkDuplicates = checkDuplicates
