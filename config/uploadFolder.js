//create a upload folder if does not exist

const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'))

async function uploadFolderStatus(uploadsFolder) {
    // uploadFolder is the directory
    try {
        await fs.statAsync(uploadsFolder)
    } catch (e) {
        // if no folder found
        if (e && e.code == 'ENOENT'){
            // ENOENT -> file does not exist
            try {
                // create the folder in destination
                await fs.mkdirAsync(uploadsFolder)
            } catch (e) {
                console.error('[ERROR] - unable to create the upload directory')
                return false
            }
            // successfully created folder
            console.log('[SUCCESS] - upload directory created')
            return true
        }
        else {
            console.log('[ERROR] - cannot access the upload directory')
            return false
        }
    }
    // if folder exists
    console.log('[SUCCESS] - upload directory exists')
    return true
}

module.exports = uploadFolderStatus