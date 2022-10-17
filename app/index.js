const express = require('express')
const app = express()

const endpoints = ['one', 'two', 'three', 'four', 'five']

app.get('/healthCheck', (req, res) => {
    res.status(200).send({
        message: 'OK',
        endpoints
    })
})

endpoints.forEach((endpointName, i) => {
    app.get('/' + endpointName, (req, res) => {
        const errorProbability = Math.random() * i

        if (errorProbability > 3) {
            return res.status(500).send('Mocked error')
        }

        return res.status(200).send('OK')
    })
})






app.listen(4545, () => {
    console.log("app is listening on port 4545")
})