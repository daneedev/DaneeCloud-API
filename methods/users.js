const axios = require("axios");
const logger = require("../handlers/logger");

async function getUser(username) {
    const user = await axios.get(this.cloudUrl + "/api/user/", {
        params: { username: username },
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (user.status == 200) {
        return {code: 200, data: user.data}
    } else if (user.status == 404) {
        logger.logError("Error 404: User not found")
        return {code: 404, data: "User not found"}
    } else {
        return {code: 401, data: "Invalid API key"}
    }
}

async function getUsers() {
    const users = await axios.get(this.cloudUrl + "/api/user/all", {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })

    if (users.status == 200) {
        return {code: 200, data: users.data}
    } else if (users.status == 401) {
        return {code: 401, data: "Invalid API key"}
    }
}

async function createUser(username, email, password) {
    const createUser = await axios.post(this.cloudUrl + `/api/user/create?username=${username}&password=${password}&email=${email}`, {}, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (createUser.status == 401) {
       return {code: 401, data: "Invalid API key"}
    } else if (createUser.status == 409) {
        logger.logError("Error 409: User already exist")
        return {code: 409, data: "User already exist"}
    } else {
        return {code: 200, data: createUser.data}
    }
} 

async function deleteUser(username) {
    const deluser = await axios.post(this.cloudUrl + `/api/user/delete?username=${username}`, {}, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (deluser.status == 200) {
        return {code: 200, data: deluser.data}
    } else if (deluser.status == 404) {
        logger.logError("Error 404: User not found")
        return {code: 404, data: "User not found"}
    } else if (deluser.status == 401) {
       return {code: 401, data: "Invalid API key"}
    }
}

async function editUser(username, newusername, newemail, newpassword) {
    const edituser = await axios.post(this.cloudUrl + `/api/user/edit?username=${username}&newusername=${newusername}&newemail=${newemail}&newpassword=${newpassword}`, {}, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (edituser.status == 201) {
        return {code: 200, data: edituser.data}
    } else if (edituser.status == 404) {
        logger.logError("Error 404: User not found")
        return {code: 404, data: "User not found"}
    } else if (edituser.status == 401) {
       return {code: 401, data: "Invalid API key"}
    }
    }

async function verifyUser(username) {
    const verifyuser = await axios.post(this.cloudUrl + `/api/user/verify?username=${username}`, {}, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (verifyuser.status == 200) {
        return {code: 200, data: verifyuser.data}
    } else if (verifyuser.status == 404) {
        logger.logError("Error 404: User not found")
        return {code: 404, data: "User not found"}
    } else if (verifyuser.status == 401) {
       return {code: 401, data: "Invalid API key"}
    }
}

async function changeUserRole(username, rolename) {
    const userrole = await axios.post(this.cloudUrl + `/api/user/role?username=${username}&&name=${rolename}`, {}, {
        headers: { "API-Key" : this.apiKey},
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })

if (userrole.status == 201) {
    return {code: 201, data: userrole.data}
} else if (userrole.status == 404) {
    logger.logError(userrole.data)
    return {code: 404, data: userrole.data}
} else if (userrole.status == 401) {
   return {code: 401, data: "Invalid API key"}
}
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    editUser,
    verifyUser,
    changeUserRole
}