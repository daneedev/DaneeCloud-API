const axios = require("axios");
const logger = require("../handlers/logger");

async function getRole(rolename) {
    const therole = await axios.get(this.cloudUrl + `/api/role?name=${rolename}`, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (therole.status == 200) {
        return {code: 200, data: therole.data}
    } else if (therole.status == 404) {
        logger.logError("Error 404: Role not found")
        return {code: 404, data: "Role not found"}
    } else if (therole.status == 401) {
       return {code: 401, data: "Invalid API key"}
    }
}

async function getRoles() {
    const therole = await axios.get(this.cloudUrl + `/api/role/all`, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (therole.status == 200) {
        return {code: 200, data: therole.data}
    } else if (therole.status == 401) {
       return {code: 401, data: "Invalid API key"}
    }
}

async function createRole(rolename, maxStorage, badgeUrl) {
    const addrole = await axios.post(this.cloudUrl + `/api/role/create`, {}, {
        params: {
            name: rolename,
            maxStorage: maxStorage.toString(),
            badge: badgeUrl
        },
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (addrole.status == 201) {
        return {code: 201, data: addrole.data}
    } else if (addrole.status == 409) {
        logger.logError("Error 409: Role already exist")
        return {code: 409, data: "Role already exist"}
    } else if (addrole.status == 401) {
       return {code: 401, data: "Invalid API key"}
    }
}

async function deleteRole(rolename) {
    const delrole = await axios.post(this.cloudUrl + `/api/role/delete?name=${rolename}`, {}, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (delrole.status == 200) {
        return {code: 200, data: delrole.data}
    } else if (delrole.status == 404) {
        logger.logError("Error 404: Role not found")
        return {code: 404, data: "Role not found"}
    } else if (delrole.status == 401) {
       return {code: 401, data: "Invalid API key"}
    }
}

async function editRole(rolename, newrolename, maxStorage, badgeUrl) {
    const editrole = await axios.post(this.cloudUrl + `/api/role/edit`, {}, {
        params: {
            name: rolename,
            newname: newrolename,
            maxStorage: maxStorage.toString(),
            badge: badgeUrl
        },
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (editrole.status == 201) {
        return {code: 201, data: editrole.data}
    } else if (editrole.status == 409) {
        logger.logError("Error 409: You can't edit this role")
        return {code: 409, data: "You can't edit this role"}
    } else if (editrole.status == 404) {
        logger.logError("Error 404: Role not found")
        return {code: 404, data: "Role not found"}
    } else if (editrole.status == 401) {
       return {code: 401, data: "Invalid API key"}
    }
}

module.exports = {
    getRole,
    getRoles,
    createRole,
    editRole,
    deleteRole
}