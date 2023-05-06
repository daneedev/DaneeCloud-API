const axios = require("axios")
const logger = require("./handlers/logger")
const checkForUpdate = require("./handlers/updater")

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
            return {code: 200, data: user.data}
        } else if (user.status == 404) {
            logger.logError("Error 404: User not found")
            return {code: 404, data: "User not found"}
        } else {
            return {code: 401, data: "Invalid API key"}
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
            return {code: 200, data: users.data}
        } else if (users.status == 401) {
            return {code: 401, data: "Invalid API key"}
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
           return {code: 401, data: "Invalid API key"}
        } else if (createUser.status == 409) {
            logger.logError("Error 409: User already exist")
            return {code: 409, data: "User already exist"}
        } else {
            return {code: 200, data: createUser.data}
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
            return {code: 200, data: deluser.data}
        } else if (deluser.status == 404) {
            logger.logError("Error 404: User not found")
            return {code: 404, data: "User not found"}
        } else if (deluser.status == 401) {
           return {code: 401, data: "Invalid API key"}
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
            return {code: 200, data: edituser.data}
        } else if (edituser.status == 404) {
            logger.logError("Error 404: User not found")
            return {code: 404, data: "User not found"}
        } else if (edituser.status == 401) {
           return {code: 401, data: "Invalid API key"}
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
            return {code: 200, data: verifyuser.data}
        } else if (verifyuser.status == 404) {
            logger.logError("Error 404: User not found")
            return {code: 404, data: "User not found"}
        } else if (verifyuser.status == 401) {
           return {code: 401, data: "Invalid API key"}
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
        return {code: 201, data: userrole.data}
    } else if (userrole.status == 404) {
        logger.logError(userrole.data)
        return {code: 404, data: userrole.data}
    } else if (userrole.status == 401) {
       return {code: 401, data: "Invalid API key"}
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
                return {code: 200, data: files.data}
            }  else if (files.status == 404) {
                logger.logError("Error 404: User not found")
                return {code: 404, data: "User not found"}
            } else if (files.status == 401) {
               return {code: 401, data: "Invalid API key"}
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
                return {code: 200, data: delfile.data}
            } else if (delfile.status == 404) {
                logger.logError(delfile.data)
                return {code: 200, data: delfile.data}
            } else if (delfile.status == 401) {
               return {code: 401, data: "Invalid API key"}
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
                return {code: 201, data: renfile.data}
            } else if (renfile.status == 404) {
                logger.logError(renfile.data)
                return {code: 404, data: renfile.data}
            } else if (renfile.status == 401) {
               return {code: 401, data: "Invalid API key"}
            }
        }
        
        async function shareFile(username, file) {
            const sharefile = await axios.post(cloudUrl + `/api/files/share?username=${username}&file=${file}`, {}, {
                headers: { "API-Key" : apiKey},
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
            const sharefile = await axios.post(cloudUrl + `/api/files/noshare?username=${username}&file=${file}`, {}, {
                headers: { "API-Key" : apiKey},
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

        // ROLES

        async function getRole(rolename) {
            const therole = await axios.get(cloudUrl + `/api/role?name=${rolename}`, {
                headers: { "API-Key" : apiKey},
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
            const therole = await axios.get(cloudUrl + `/api/role/all`, {
                headers: { "API-Key" : apiKey},
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
            const addrole = await axios.post(cloudUrl + `/api/role/create`, {}, {
                params: {
                    name: rolename,
                    maxStorage: maxStorage.toString(),
                    badge: badgeUrl
                },
                headers: { "API-Key" : apiKey},
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
            const delrole = await axios.post(cloudUrl + `/api/role/delete?name=${rolename}`, {}, {
                headers: { "API-Key" : apiKey},
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
            const editrole = await axios.post(cloudUrl + `/api/role/edit`, {}, {
                params: {
                    name: rolename,
                    newname: newrolename,
                    maxStorage: maxStorage.toString(),
                    badge: badgeUrl
                },
                headers: { "API-Key" : apiKey},
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

        // DASH
        
        async function getDashInfo() {
            const dash = await axios.get(cloudUrl + `/api/dash/`, {
                headers: { "API-Key" : apiKey},
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            })
            if (dash.status == 200) {
                return {code: 200, data: dash.data}
            } else if (dash.status == 401) {
               return {code: 401, data: "Invalid API key"} 
            }
        }
        // CHECK FOR UPDATES

        checkForUpdate()

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
            renameFile,
            shareFile,
            disableFileSharing,
            getRole,
            getRoles,
            createRole,
            deleteRole,
            editRole,
            getDashInfo
           }
}

module.exports.Cloud = Cloud