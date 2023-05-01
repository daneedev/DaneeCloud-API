
async function checkForUpdate() {
const axios = require("axios")
const colors = require("colors")
const Updater = await axios.get('https://registry.npmjs.org/randomimgapi')
const stableVersion = Updater.data['dist-tags'].latest
    const version = require('../package.json').version
    if (stableVersion !== version && !version.includes('dev')) {
      console.log(colors.blue("[DaneeCloudAPI Updater] ") + colors.red("Please update DaneeCloud-API!"))
    } else if (version.includes('dev')) {
        console.log(colors.blue("[DaneeCloudAPI Updater] ") + colors.green("YOU ARE USING DEVELOPMENT VERSION!"))
    } else {
        console.log(colors.blue("[DaneeCloudAPI Updater] ") + "You are using latest version!")
    }
}

module.exports = checkForUpdate