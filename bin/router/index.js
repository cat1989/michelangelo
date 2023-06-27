const express = require('express')
const router = new express.Router()

router.get('/api', (req, res) => {
    res.send('Hello world!').end()
})

module.exports = router
