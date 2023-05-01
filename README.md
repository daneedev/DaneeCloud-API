# DaneeCloud API
## About
- This package can easily handle DaneeCloud API with lot of functions
## Installation
```bash
# Install latest version
npm install daneecloud-api@latest
# Install development version (use at your own risk)
npm install daneecloud-api@dev
```
## Index.js example
```js
const { Cloud } = require("daneecloud-api")

const cloud = Cloud({
    cloudUrl: "", // URL address of your cloud e.c. https://cloud.daneeskripter.dev
    apiKey: "" // API Key of your cloud. You can generate it at /addapikey
})
```
## Functions
### Users
#### Get a user
```js
const user = await cloud.getUser(username)
```
#### Get all users
```js
const users = await cloud.getUsers()
```
#### Create a user
```js
const newuser = await cloud.createUser(username, email, password)
```
#### Edit a user
```js
const edituser = await cloud.editUser(username, newusername, newemail, newpassword)
```
#### Delete a user
```js
const deleteuser = await cloud.deleteUser(username)
```
#### Send a verification email to user
```js
const verifyuser = await cloud.verifyUser(username)
```
#### Change user's role
```js
const changerole = await cloud.changeUserRole(username, rolename)
```
### Files
#### Get files from user
```js
const files = await cloud.getFiles(username)
```
#### Rename a file
```js
const renamefile = await cloud.renameFile(username, file, newname)
```
#### Delete a file
```js
const deletefile = await cloud.deleteFile(username, file)
```
#### Share a file
```js
const sharefile = await cloud.shareFile(username, file)
```
#### Set file as not shared
```js
const disableshare = await cloud.disableFileSharing(username, file)
```
### Roles
#### Get role
```js
const role = await cloud.getRole(rolename)
```
#### Get all roles
```js
const roles = await cloud.getRoles()
```
#### Create a role
```js
const createrole = await cloud.createRole(rolename, maxStorage, badgeUrl)
```
#### Edit a role
```js
const editrole = await cloud.editRole(rolename, newrolename, maxStorage, badgeUrl)
```
#### Delete a role
```js
const deleterole = await cloud.deleteRole(rolename)
```
### Dashboard
#### Get dashboard info
```js
const info = await cloud.getDashInfo()
```

# Made with JS & 💖 by DaneeSkripter