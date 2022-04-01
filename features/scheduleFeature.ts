import { Client, MessageReaction, PartialMessageReaction, PartialUser, User } from 'discord.js'

/**
 * async function updateParticipantCount
 * since the original schedule.ts embed cannot be changed dynamically,
 * we fetch it here and can modify the count of reactions.
 * @param message 
 * @param react 
 */
async function updateParticipantCount(message: MessageReaction | PartialMessageReaction, react: User | PartialUser) {
    const checkmark = '✅'
    const not_going = '🚫'
    const unsure = '❔'
    if(react.bot === false && message.message.interaction?.commandName === 'schedule') {
        let reactionCache =  message.message.reactions.cache
        let goingCount = (reactionCache.get(checkmark)?.count ?? 1) - 1
        let not_goingCount = (reactionCache.get(not_going)?.count ?? 1) - 1
        let unsureCount = (reactionCache.get(unsure)?.count ?? 1) - 1
        let modifiedEmbed = message.message.embeds[0].setFields([
            {
                name: `${checkmark} Going`,
                value: `${goingCount}`,
                inline: true
            },
            {
                name: `${not_going} Not Going`,
                value: `${not_goingCount}`,
                inline: true
            },
            {
                name: `${unsure} Unsure`,
                value: `${unsureCount}`,
                inline: true
            }
        ])
        message.message.edit({
            embeds: [modifiedEmbed]
        })
    }
}

export default (client: Client) => {
  client.on('messageReactionAdd', async (message, react) => {
    if(message.message.reactions.cache.size > 3) message.remove()
    await updateParticipantCount(message, react)
  })

  client.on('messageReactionRemove', async (message, react) => {
    await updateParticipantCount(message, react)
  })
} 