 async function getFolders(username) {
    const folders = await axios.get(this.cloudUrl + `/api/folders?username=${username}`, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (folders.status == 200) {
        return {code: 200, data: folders.data}
    } else if (folders.status == 401) {
       return {code: 401, data: "Invalid API key"} 
    } else if (folders.status == 404) {
        logger.logError("Error 404: User not found")
        return {code: 404, data: "User not found"}
    }
}

async function getFilesFromFolder(username, folder) {
    const folders = await axios.get(this.cloudUrl + `/api/folders/files?username=${username}&folder=${folder}`, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (folders.status == 200) {
        return {code: 200, data: folders.data}
    } else if (folders.status == 401) {
       return {code: 401, data: "Invalid API key"} 
    } else if (folders.status == 404) {
        logger.logError(folders.data)
        return {code: 404, data: folders.data}
    }
}

async function createFolder(username, folder) {
    const createFolder = await axios.post(this.cloudUrl + `/api/folders/create`, {}, {
        params: {
            username: username,
            folder: folder
        },
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (createFolder.status == 201) {
        return {code: 201, data: "Folder created"}
    } else if (createFolder.status == 401) {
       return {code: 401, data: "Invalid API key"} 
    } else if (createFolder.status == 404) {
        logger.logError("Error 404: User not found")
        return {code: 404, data: "User not found"}
    } else if (createFolder.status == 409) {
        logger.logError("Error 409: Folder already exist")            
        return {code: 409, data: "Folder already exist"}
    }
}

async function deleteFolder(username, folder) {
    const deleteFolder = await axios.post(this.cloudUrl + `/api/folders/delete`, {}, {
        params: {
            username: username,
            folder: folder
        },
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (deleteFolder.status == 200) {
        return {code: 200, data: "Folder deleted"}
    } else if (deleteFolder.status == 401) {
       return {code: 401, data: "Invalid API key"} 
    } else if (deleteFolder.status == 404) {
        logger.logError(deleteFolder.data)
        return {code: 404, data: deleteFolder.data}
    }
}

async function renameFileFolder(username, folder, file, newname) {
    const renameFile = await axios.post(this.cloudUrl + `/api/folders/files/rename`, {}, {
        params: {
            username: username,
            folder: folder,
            file: file,
            newname: newname
        },
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (renameFile.status == 201) {
        return {code: 201, data: "File renamed"}
    } else if (renameFile.status == 401) {
       return {code: 401, data: "Invalid API key"} 
    } else if (renameFile.status == 404) {
        logger.logError(renameFile.data)
        return {code: 404, data: renameFile.data}
    }
}

async function deleteFileFolder(username, folder, file) {
    const deleteFile = await axios.post(this.this.cloudUrl + `/api/folders/files/delete`, {}, {
        params: {
            username: username,
            folder: folder,
            file: file
        },
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (deleteFile.status == 200) {
        return {code: 200, data: "File deleted"}
    } else if (deleteFile.status == 401) {
       return {code: 401, data: "Invalid API key"} 
    } else if (deleteFile.status == 404) {
        logger.logError(deleteFile.data)
        return {code: 404, data: deleteFile.data}
    }
}

module.exports = {
    createFolder,
    deleteFolder,
    renameFileFolder,
    deleteFileFolder,
    getFilesFromFolder,
    getFolders
}