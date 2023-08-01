const axios = require("axios")
const logger = require("./handlers/logger")
const checkForUpdate = require("./handlers/updater")
const users = require("./methods/users")
const files = require("./methods/files")
const roles = require("./methods/roles")
const dash = require("./methods/dash")
const folders = require("./methods/folders")

class Cloud {
    constructor({cloudUrl, apiKey}) {
        this.cloudUrl = cloudUrl;
        this.apiKey = apiKey;
    }

    // USERS
    async getUser(username) {
        return users.getUser.call(this, username)
      }

      async getUsers() {
        return users.getUsers.call(this)
      }
      async createUser(username, email, password) {
        return users.createUser.call(this, username, email, password)
      }

      async  deleteUser(username) {
        return users.deleteUser.call(this, username)
      }

      async editUser(username, newusername, newemail, newpassword) {
        return users.editUser.call(this, username, newusername, newemail, newpassword, newpassword)
      }

      async verifyUser(username) {
        return users.verifyUser.call(this, username)
      }

      async changeUserRole(username, rolename) {
        return users.changeUserRole.call(this, username, rolename)
      }

    // FILES
      async getFiles(username) {
        return files.getFiles.call(this, username)
      }

      async deleteFile(username, file) {
        return files.deleteFile.call(this, username, file)
      }

      async renameFile(username, file, newname) {
        return files.renameFile.call(this, username, file, newname)
      }

      async shareFile(username, file) {
        return files.shareFile.call(this, username, file)
      }

      async disableFileSharing(username, file) {
        return files.disableFileSharing.call(this, username, file)
      }

        // ROLES
      async getRole(rolename) {
        return roles.getRole.call(this, rolename)
      }
      
      async getRoles() {
        return roles.getRoles.call(this)
      }

      async createRole(rolename, maxStorage, badgeUrl) {
        return roles.createRole.call(this, rolename, maxStorage, badgeUrl)
      }

      async deleteRole(rolename) {
        return roles.deleteRole.call(this, rolename)
      }

      async editRole(rolename, newrolename, maxStorage, badgeUrl) {
        return roles.editRole.call(this, rolename, newrolename, maxStorage, badgeUrl)
      }

      // DASH

      async getDashInfo() {
        return dash.getDashInfo.call(this)
      }

      // FOLDERS
      async getFolders(username) {
        return folders.getFolders.call(this, username)
      }

      async getFilesFromFolder(username, folder) {
        return folders.getFilesFromFolder.call(this, username, folder)
      }

      async createFolder(username, folder) {
        return folders.createFolder.call(this, username, folder)
      }

      async deleteFolder(username, folder) {
        return folders.deleteFolder.call(this, username, folder)
      }

      async renameFileFolder(username, folder, file, newname) {
        return folders.renameFileFolder.call(this, username, folder, file, newname)
      }

      async deleteFileFolder(username, folder, file) {
        return folders.deleteFileFolder.call(this, username, folder, file)
      }

    }
        // CHECK FOR UPDATES
        checkForUpdate()
        
module.exports.Cloud = Cloud