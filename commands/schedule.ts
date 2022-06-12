import Discord, { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

/**
 * template file for the original embed, when first sent.
 * 
 * using the wokcommands library, it makes it simple
 * to organize how your embedded message (or any other message)
 * will be displayed
 * 
 * the category, slash, testOnly, and permissions fields are
 * not displayed in the bot command itself
 * 
 * the description filed is shown when the user types in the command
 * to initiate the creation of an evet: /schedule
 * 
 * the options field holds all the template fields with which the user will set 
 * arguments. for example, the first option will ask the user to type in a title 
 * for their event, and then they will tab to the next option, etc.
 * 
 */
export default {
    category: 'Organization',
    description: 'Schedules an event',
    slash: true,
    testOnly: true, 
    expectedArgs: "<title> <description> <color>",
    permissions: ["ADMINISTRATOR"],
    options: [
        {
            name: 'title',
            description: 'Please provide a title for the event you wish to schedule:',
            required: true,
            type: 3

        },
        {
            name: 'description',
            description: 'Please provide a description for your event:',
            required: true,
            type: 3
        },
        {
            name: 'color',
            description: 'Please select the color of your event message as a hex code, such as #000000:',
            required: true,
            type: 3
        }
    ],
    /**
     * this callback method is a wokcommands feature. 
     * it is invoked whenever the command is ran by a 
     * user. each object passed in allows us to 
     * interact with the properties of the channel, 
     * server, and message. 
     * 
     * here, a new embedded message is being created,
     * with all of its methods setting the contents
     * based off of the options the user has input 
     * (see above).
     * 
     * the interaction object is used for slash commands,
     * and it will reply with the embed (message).
     * 
     * to be able to add reactions automatically to the 
     * message, we must first get the id of the sent message, 
     * and then react on in.
     * 
     * @param user
     * @param channel
     * @param args
     * @param interaction
     */
    callback: async ({user, channel, args, interaction}) => {
        const checkmark = '✅'
        const not_going = '🚫'
        const unsure = '❔'
        const embed = new MessageEmbed()
            .setAuthor({
                name: user.username + ' is organizing an event!'
            })
            .setTitle(args[0])
            .setDescription(args[1])
            .setColor(args[2] as Discord.ColorResolvable)
            .addFields([
                {
                    name: `${checkmark} Going`,
                    value: `0`,
                    inline: true
                },
                {
                    name: `${not_going} Not Going`,
                    value: `0`,
                    inline: true
                },
                {
                    name: `${unsure} Unsure`,
                    value: `0`,
                    inline: true
                }
            ])
        let sentMessage = await interaction.reply({
            embeds: [embed],
            fetchReply: true
        })
        
        let msg = await channel.messages.fetch(sentMessage.id)
        msg.react(checkmark)
        msg.react(not_going)
        msg.react(unsure)
        
    } 
} as ICommand