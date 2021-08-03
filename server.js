require('dotenv').config()
const express = require('express')
const Discord = require('discord.js')
const fs = require('fs')

var app = express()
var bot = new Discord.Client();

app.use('/', (req, res) => {
    res.send('Hello')
})

fs.readdir('./events/', (err, files) =>{
    files.forEach((file) => {
        const eventHandler = require(`./events/${file}`)
        const eventName = file.split('.')[0]
        bot.on(eventName, (arg) =>{
            eventHandler(bot, arg)
        })
    })
})

app.listen(process.env.PORT, () => {
    console.log('Server is on http://localhost'+process.env.PORT)
})

bot.login(process.env.BOT_TOKEN)

module.exports = app