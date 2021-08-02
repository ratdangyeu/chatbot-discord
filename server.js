const express = require('express')
require('dotenv').config()

var app = express()

app.use('/', (req, res) => {
    res.send('Hello')
})

app.listen(process.env.PORT, () => {
    console.log('Server is on http://localhost'+process.env.PORT)
})

module.exports = app