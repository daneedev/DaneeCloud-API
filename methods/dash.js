const axios = require("axios");
const logger = require("../handlers/logger");

async function getDashInfo() {
    const dash = await axios.get(this.cloudUrl + `/api/dash/`, {
        headers: { "API-Key" : this.apiKey},
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

module.exports = {
    getDashInfo
}