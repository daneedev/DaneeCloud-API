const axios = require("axios")
const logger = require("./logger")

function Cloud({cloudUrl, apiKey}) {
    // USERS
        async function getUser(username) {
        
            const user = await axios.get( cloudUrl + "/api/user/", {
                params: { username: username },
                headers: { "API-Key" : apiKey},
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            })
            if (user.status == 200) {
                return user.data
            } else if (user.status == 404) {
                return logger.logError("Error 404: User not found")
            } else {
                throw new Error("Error 401: Invalid API Key")
            }
        }
    
        async function getUsers() {
            const users = await axios.get(cloudUrl + "/api/user/all", {
                headers: { "API-Key" : apiKey},
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            })
    
            if (users.status == 200) {
                return users.data
            } else if (users.status == 401) {
                throw new Error("Error 401: Invalid API Key")
            }
        }
    
        async function createUser(username, email, password) {
            const createUser = await axios.post(cloudUrl + `/api/user/create?username=${username}&password=${password}&email=${email}`, {}, {
                headers: { "API-Key" : apiKey},
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            })
            if (createUser.status == 401) {
                throw new Error("Error 401: Invalid API Key")
            } else if (createUser.status == 409) {
                return logger.logError("Error 409: User already exist")
            } else {
                return createUser.data
            }
        } 
    
        async function deleteUser(username) {
            const deluser = await axios.post(cloudUrl + `/api/user/delete?username=${username}`, {}, {
                headers: { "API-Key" : apiKey},
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            })
            if (deluser.status == 200) {
                return deluser.data 
            } else if (deluser.status == 404) {
                return logger.logError("Error 404: User not found")
            } else if (deluser.status == 401) {
                throw new Error("Error 401: Invalid API Key")
            }
        }
    
        async function editUser(username, newusername, newemail, newpassword) {
            const edituser = await axios.post(cloudUrl + `/api/user/edit?username=${username}&newusername=${newusername}&newemail=${newemail}&newpassword=${newpassword}`, {}, {
                headers: { "API-Key" : apiKey},
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            })
            if (edituser.status == 201) {
                return edituser.data
            } else if (edituser.status == 404) {
                return logger.logError("Error 404: User not found")
            } else if (edituser.status == 401) {
                throw new Error("Error 401: Invalid API Key")
            }
            }

        async function verifyUser(username) {
            const verifyuser = await axios.post(cloudUrl + `/api/user/verify?username=${username}`, {}, {
                headers: { "API-Key" : apiKey},
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            })
            if (verifyuser.status == 200) {
                return verifyuser.data
            } else if (verifyuser.status == 404) {
                return logger.logError("Error 404: User not found")
            } else if (verifyuser.status == 401) {
                throw new Error("Error 401: Invalid API Key")
            }
        }

        async function changeUserRole(username, rolename) {
            const userrole = await axios.post(cloudUrl + `/api/user/role?username=${username}&&name=${rolename}`, {}, {
                headers: { "API-Key" : apiKey},
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            })
        
        if (userrole.status == 201) {
            return userrole.data
        } else if (userrole.status == 404) {
            return logger.logError(userrole.data)
        } else if (userrole.status == 401) {
            throw new Error("Error 401: Invalid API Key")
        }
        }

        // FILES

        async function getFiles(username) {
            const files = await axios.get(cloudUrl + `/api/files?username=${username}`, {
                headers: { "API-Key" : apiKey},
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            })
            if (files.status == 200) {
                return files.data
            }  else if (files.status == 404) {
                return logger.logError("Error 404: User not found")
            } else if (files.status == 401) {
                throw new Error("Error 401: Invalid API Key")
            }
        }

        async function deleteFile(username, file) {
            const delfile = await axios.post(cloudUrl + `/api/files/delete?username=${username}&file=${file}`, {}, {
                headers: { "API-Key" : apiKey},
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            })
            if (delfile.status == 200) {
                return delfile.data
            } else if (delfile.status == 404) {
                return logger.logError(delfile.data)
            } else if (delfile.status == 401) {
                throw new Error("Error 401: Invalid API Key")
            }
        }
        
        async function renameFile(username, file, newname) {
            const renfile = await axios.post(cloudUrl + `/api/files/rename?username=${username}&file=${file}&newname=${newname}`, {}, {
                headers: { "API-Key" : apiKey},
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            })
            if (renfile.status == 201) {
                return renfile.data
            } else if (renfile.status == 404) {
                return logger.logError(renfile.data)
            } else if (renfile.status == 401) {
                throw new Error("Error 401: Invalid API Key")
            }
        }
        return {
            getUser,
            getUsers,
            createUser,
            editUser,
            deleteUser,
            verifyUser,
            changeUserRole,
            getFiles,
            deleteFile,
            renameFile
           }
}

module.exports.Cloud = Cloud