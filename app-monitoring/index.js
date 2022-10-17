const axios = require('axios')

const APP_URL = 'http://localhost:4545'

const getEndpoints = (response) => {
    if (response.status === 200 && response.statusText === 'OK') {
        return response.data.endpoints;
    } else {
        return Promise.reject("Error while getting health check response")
    }
}

const startCallingEndpoints = (endpoints) => {
    setInterval(() => {
        const randomEndpoint = endpoints[Math.round(Math.random() * (endpoints.length - 1))]
        axios
            .get(APP_URL + '/' + randomEndpoint)
            .then((message) => console.log("OK"))
            .catch((message) => console.log("Error", message && message.response && message.response.data))
    }, 50)
}

axios
    .get(APP_URL + '/healthCheck')
    .then(getEndpoints)
    .then(startCallingEndpoints)
    .catch((error) => console.error(error))
