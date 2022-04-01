import Discord, { Intents } from 'discord.js'
import wok from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})

client.on('ready', () => {
    console.log('Manager is online!')
    
    new wok(client, {
        commandDir: path.join(__dirname, 'commands'),
        featureDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['766422643670384650']
    })
})

client.login(process.env.TOKEN)