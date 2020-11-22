require('dotenv').config()

const { Client, Emoji } = require('discord.js')

const client = new Client()

const PREFIX = '$' 


// Log the bot in!

client.login(process.env.DISCORDJS_BOT_TOKEN).then(res => {
    
})

client.on('message' , (message) => {
    if (message.author.bot) return;

    if (message.content === 'JD') {
        message.reply('JD is nice')
        message.channel.send('This is a nice server')
    } 

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('Not allowed')
            if (args.length === 0) return message.reply('No user selected')
            const member = message.guild.members.cache.get(args[0])

            if (member) {
                member.kick()
                .then((member) => message.channel.send(`${member} was Kicked`))
                .catch(err => { message.reply(err + ' An error happend')})
            }
            else {
            
            }
        } else if (CMD_NAME === 'ban') {
            if (!message.member.hasPermission('BAN_MEMBERS')) return;
            if (args.length === 0) return message.reply('No user selected')
            const member = message.guild.members.cache.get(args[0])

            member.ban()
            .then((member) => {
                message.channel.send(`${member} has been banned`)
            })
        }

        if (CMD_NAME === 'hi') {
            if (message.member.hasPermission('CHANGE_NICKNAME')) {
               let mes = message.reply("Hello: " + message.author.username + ' Hope your good 👍')
               mes.then(res => { 
                 message.react('👍')
                 res.react('👍')
               })
            }
        }

        if (CMD_NAME === 'DM') {
            let msg = message.author.send('You asked me to DM you')
            msg.then(res => {
                 res.react('👍')
            })
        }
    }
})

client.on('message', message => {
    
    if (message.channel.type === 'dm') {
        if (message.mentions && !message.author.bot) {
        message.react('👍')
        let msg = message.author.send('Hi how are you?')
        msg.then(res => {
        })
    } else {
            message.react('💖')
    }
    }
})

client.on('ready' , (e) => {
    console.log('Logged in!')
})