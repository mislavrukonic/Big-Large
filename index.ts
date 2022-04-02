import Discord, { Intents } from 'discord.js'
import wok from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

/**
 * index.ts file
 * the clinet object represents the bot
 * itself. since discord.js v13, you must specify
 * your intents for what your bot will need
 * access to.
 */
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})

/**
 * when the bot is ready (when you run the file),
 * the wokcommands will create a new object of itself,
 * and prepare the bot.
 * 
 * it will load all commands and features, similarly to how
 * the well known fs (file system) import would by looking 
 * for files in directories which are of the same name
 * for commands, and then load featues via the features folder.
 * 
 * denoting typescript to true means that it looks for the 
 * ICommand object which is exported, instead of the default
 * module for JS. 
 * 
 * the testServer field denotes that it will register
 * the command to the specified, non-live server. it may
 * take up to an hour to register a command to a live server.
 */
client.on('ready', () => {
    console.log('Manager is online!')
    
    new wok(client, {
        commandDir: path.join(__dirname, 'commands'),
        featureDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: process.env.TESTSERVER
    })
})


/**
 * used to login the bot with its token
 */
client.login(process.env.TOKEN)