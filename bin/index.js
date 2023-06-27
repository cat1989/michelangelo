const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router')
const path = require('path')
const portfinder = require('portfinder')
const { exec } = require('child_process')

portfinder.getPort((err, port) => {
    if (err) {
        exit
    }
    const app = express()
    app.use(helmet())
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: false,
    }))
    app.use(router)
    app.use(express.static(path.resolve(__dirname, '../dist')))

    app.listen(port, () => {
        exec(`start http://localhost:${port}/`)
    })
})
