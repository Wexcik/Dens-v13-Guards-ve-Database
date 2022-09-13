const client = global.Database
const { MessageEmbed } = require('discord.js')
const bots = require('../../Configs/whitelist')
exports.execute = async (channel) => {
    let entry = await channel.guild.fetchAuditLogs({ type: "CHANNEL_CREATE" }).then(dens => dens.entries.first());
    if (bots.bots.includes(entry.executor.id)) return
    if (!entry || !entry.executor || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return
    await channel.guild.members.ban(entry.executor.id, { reason: "Wex - Kanal Oluşturma Koruması" })
    await channel.delete({ reason: "Wex Kanal Oluşturma Koruması" }).catch(err => console.log(`Event: ${exports.conf.event}\nError: ${err}`))
    const log = client.channels.cache.find(x => x.name === "guard-log")
    const mesajknk = new MessageEmbed().setTitle('Wex - Kanal oluşturma Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından bir kanal oluşturmaya çalıştı ve onu jaile attım.`).setTimestamp()
    if (log) {
        log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
    }
    return;
}

exports.conf = {
    event: "channelCreate",
}