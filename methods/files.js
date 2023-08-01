const axios = require("axios");
const logger = require("../handlers/logger");

async function getFiles(username) {
    const files = await axios.get(this.cloudUrl + `/api/files?username=${username}`, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (files.status == 200) {
        return {code: 200, data: files.data}
    }  else if (files.status == 404) {
        logger.logError("Error 404: User not found")
        return {code: 404, data: "User not found"}
    } else if (files.status == 401) {
       return {code: 401, data: "Invalid API key"}
    }
}

async function deleteFile(username, file) {
    const delfile = await axios.post(this.cloudUrl + `/api/files/delete?username=${username}&file=${file}`, {}, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (delfile.status == 200) {
        return {code: 200, data: delfile.data}
    } else if (delfile.status == 404) {
        logger.logError(delfile.data)
        return {code: 200, data: delfile.data}
    } else if (delfile.status == 401) {
       return {code: 401, data: "Invalid API key"}
    }
}

async function renameFile(username, file, newname) {
    const renfile = await axios.post(this.cloudUrl + `/api/files/rename?username=${username}&file=${file}&newname=${newname}`, {}, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (renfile.status == 201) {
        return {code: 201, data: renfile.data}
    } else if (renfile.status == 404) {
        logger.logError(renfile.data)
        return {code: 404, data: renfile.data}
    } else if (renfile.status == 401) {
       return {code: 401, data: "Invalid API key"}
    }
}

async function shareFile(username, file) {
    const sharefile = await axios.post(this.cloudUrl + `/api/files/share?username=${username}&file=${file}`, {}, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (sharefile.status == 201) {
        return {code: 201, data: sharefile.data}
    } else if (sharefile.status == 404) {
        logger.logError(sharefile.data)
        return {code: 404, data: sharefile.data}
    } else if (sharefile.status == 401) {
       return {code: 401, data: "Invalid API key"}
    } else if (sharefile.status == 409) {
        logger.logError("Error 409: File is already shared")
        return { code: 409, data: "File is already shared"}
    }
}

async function disableFileSharing(username, file) {
    const sharefile = await axios.post(this.cloudUrl + `/api/files/noshare?username=${username}&file=${file}`, {}, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (sharefile.status == 201) {
        return {code: 201, data: sharefile.data}
    } else if (sharefile.status == 404) {
        logger.logError(sharefile.data)
        return { code: 404, data: sharefile.data}
    } else if (sharefile.status == 401) {
       return {code: 401, data: "Invalid API key"}
    } 
}

module.exports = {
    getFiles,
    deleteFile,
    renameFile,
    shareFile,
    disableFileSharing
}