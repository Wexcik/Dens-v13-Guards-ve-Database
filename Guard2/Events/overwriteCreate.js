const client = global.GuardTwo
const { MessageEmbed } = require('discord.js')
const bots = require('../../Configs/whitelist')
exports.execute = async (oChannel, nChannel) => {
    let entry = await nChannel.guild.fetchAuditLogs({ type: "CHANNEL_OVERWRITE_CREATE" }).then(udit => udit.entries.first());
    if (bots.bots.includes(entry.executor.id)) return
    if (!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 1000 || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")|| entry.target.id !== nChannel.id) return
    await nChannel.permissionOverwrites.set(oChannel.permissionOverwrites.cache)
    nChannel.guild.members.ban(entry.executor.id, { reason: "Wex - Kanal İzin Koruması" })

    const log = client.channels.cache.find(x => x.name === "guard-log")
    const mesajknk = new MessageEmbed().setTitle('Wex - Kanal izin açma Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından <#${oChannel.id}> isimli kanalın izinleriyle oynamaya çalıştı ve onu jaile attım.`).setTimestamp()
    if (log) {
        log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
    }

}

exports.conf = {
    event: "channelUpdate",
}