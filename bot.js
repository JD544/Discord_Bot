require('dotenv').config()

const firebase = require('firebase')

firebase.default.initializeApp({
    //Your config goes here
})
var ArgsLocked = true
var Loggingin = false

const { Client} = require('discord.js')

const Discord = require('discord.js')

const DMSETT_Z = (username) => {
    client.on('message' , (message) => {
        if (message.channel.type === 'dm') {
            if (message.content === '!y' && Loggingin) {
                const auth = firebase.default.auth()
                message.channel.send("Please provide an password").then(() => {
                    setTimeout(()=> {
                        const password = message.channel.lastMessage.content

                        auth.signInWithEmailAndPassword(username, password).then(user => {
                            message.reply("You are now logged in as: " + user.user.displayName)
                        Loggingin = false
                        }).catch(err => {
                            message.reply("Something went wrong " + err)
                            Loggingin = false
                        })
                    },12000)
                })
            }
        }
    })        
}

const DMD = DMSETT_Z

const client = new Client()

const PREFIX = '$'

// Log the bot in!

client.login(process.env.DISCORDJS_BOT_TOKEN).then(res => {
    client.user.setPresence({
        activity: {
            name: "Fortnite",
            type: 'PLAYING',
            url: 'https://www.epicgames.com/store/en-US/product/fortnite/home'
        },
        status: 'online'
    })    
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
        
        if (CMD_NAME === 'Logout') {
            const auth = firebase.default.auth()

            if (auth.currentUser) {
                auth.signOut()
            } else {
                message.reply("No user is currently logged in!")
            }
        }

        if (CMD_NAME === 'DM') {
            let msg = message.author.send('You asked me to DM you')
            msg.then(res => {
                 res.react('👍')
            })
        }

        if (CMD_NAME === 'help') {
            const Embed = new Discord.MessageEmbed()
            .setTitle('List of Commands')
            .setDescription("kick/ ban | Bans or Kicks a user |  DM | DM's the user as requestes | Login | Login to your GMAD account | isuser | Check's if your logged in | help | provides a list of commands")
            .setAuthor("JD")

            message.channel.send(Embed)
        }

        if (CMD_NAME === 'Login') {
            const user = message.author
            const DM = DMD
            message.channel.send('Whats your username/ email').then(res => {
                    setTimeout(() => {
                    if (message.channel.lastMessage.author.tag == user.tag) {
                            message.reply("I will DM you with further instructions")
                            const StoredEmail = message.channel.lastMessage.content + '@' + args[0]
                            message.author.send("Instructions to Login with account: " + StoredEmail)
                            message.author.send('Please confirm by "!y"')
                            Loggingin = true
                            DM(StoredEmail)
                    } else {
                        message.channel.send('Took too long to Login')
                    }
                },16000)
            }).catch(err => {
                return err;
            })
        }
    }
})

client.on('ready' , (e) => {
    console.log('Logged in!')
})
