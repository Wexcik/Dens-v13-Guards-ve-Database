const client = global.GuardThree
const { MessageEmbed } = require('discord.js')
const bots = require('../../Configs/whitelist')
exports.execute = async (member) => {
    let entry = await member.guild.fetchAuditLogs({ type: "WEBHOOK_CREATE" }).then(dens => dens.entries.first());
    
    if (bots.bots.includes(entry.executor.id)) return
    if (!entry || !entry.executor || await client.checkPermission(client, entry.executor.id, "full")) return
    member.guild.members.kick(entry.executor.id, { reason: 'Dens - Webhook Koruması'}).catch(err => console.log(`Etkinlik: ${exports.conf.event}\nError: ${err}`))
    entry.target.delete({reason: "Wex - Webhook Koruması"})
    const log = client.channels.cache.find(x => x.name === "guard-log")
    const mesajknk = new MessageEmbed().setTitle('Wex -Webhook Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından webhook açıldı! Webhooku açan kişiyi sunucudan attım ve webhooku sildim.`).setTimestamp()
    if (log) {
        log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
    }
    return;
}

exports.conf = {
    event: "webhookUpdate",
}