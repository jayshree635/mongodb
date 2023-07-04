require('dotenv').config()

function getProfileURL (fileName,folderName){
    return process.env.APP_PROJECT_URL + `images/${folderName}/`+fileName;
}

module.exports = {
    getProfileURL
}