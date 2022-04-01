import Discord, { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'testing',
    description: 'schedule an event',
    slash: true,
    testOnly: true, 
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