const Discord = require('discord.js')

var attachment = new Discord.MessageAttachment('./assets/images/bot-hi.gif', 'bot-hi.gif')
var embed = new Discord.MessageEmbed()
    .setTitle('Xin chào! Tôi có thể giúp gì cho bạn?')
    .setImage('attachment://bot-hi.gif')
    .setColor('#2596be')
    .setDescription('1. Giải trí\n' +
                    '2. Tài liệu\n' +
                    '3. Công việc\n' +
                    '(*) Sử dụng \'' + '!' + '\'' + ' trước mỗi từ khóa hoặc lựa chọn!' )

var prefix = '!'

const MIN = 0
const MAX = 500

module.exports = (bot, msg) => {
    let message = msg.content?.toLowerCase()?.trim();
    if (message.charAt(0) === prefix){
        switch(message){
            case '!bắt đầu':
                msg.channel.send({embed, files: [attachment]})
                break
            case '!giải trí':
            case '!1': 
                games(msg)          
                break
            case '!tài liệu':
            case '!2':  
                documents(msg)            
                break
            case '!công việc':
            case '!3':
                works(msg)                
                break
            default:
                msg.reply('Chức năng chưa hỗ trợ!')
                break
        }
    }    
}

var games = (msg) => {
    let botNum = Math.floor(Math.random() * (MAX - MIN)) + MIN;
    msg.reply('Trò chơi đoán số!\n' +
              'Mời bạn đoán số trong khoảng từ 0 -> 500')

    const filter = m => Number(m.content?.trim());
    const collector = msg.channel.createMessageCollector(filter, {max: 7})
    collector.on('collect', m => {
        let guessNum = Number(m.content?.trim())
        if (guessNum == botNum){
            msg.reply('Chính xác!')
            collector.stop('Chiến thắng!')
        }
        else if (guessNum < botNum){
            msg.reply('Lớn hơn')
        }
        else if (guessNum > botNum){
            msg.reply('Nhỏ hơn')
        }
    })  
    collector.on('end', () => msg.reply(`Số cần đoán là ${botNum}`)) 
}

var documents = (msg) => {
    msg.reply('Chưa có tài liệu nào phù hợp!')
}

var works = (msg) => {
    msg.reply('Chưa có công việc nào!')
}

