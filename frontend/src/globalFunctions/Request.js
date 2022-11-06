import axios from "axios"
class Request {
    static async sendRequest(type, url, data) {
        const options = {
            url: process.env.VUE_APP_SERVER + url,
        }
        if (type.toUpperCase() === 'PUT') {
            options.method = 'PUT'
            options.headers = {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
            options.data = data
        }

        const response = await axios(options);

        return response
    }

}

export default Request