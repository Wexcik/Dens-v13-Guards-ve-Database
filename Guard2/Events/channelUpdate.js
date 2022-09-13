const client = global.GuardTwo
const { MessageEmbed } = require('discord.js')
const bots = require('../../Configs/whitelist')
exports.execute = async (oChannel, nChannel) => {

    let entry = await nChannel.guild.fetchAuditLogs({ type: "CHANNEL_UPDATE" }).then(udit => udit.entries.first());
    if (bots.bots.includes(entry.executor.id)) return
    if (!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return
    nChannel.guild.members.ban(entry.executor.id, { reason: "Wex - Kanal Ayarlarını Güncelleme Koruması" })
    if (nChannel.type !== "GUILD_CATAGORY" && nChannel.parentId !== oChannel.parentId) nChannel.setParent(oChannel.parentId);
    if (nChannel.type === "GUILD_CATEGORY") {
        nChannel.edit({
            position: oChannel.position,
            name: oChannel.name,
        });
    } else if (nChannel.type === "GUILD_TEXT" || (nChannel.type === "GUILD_NEWS")) {
        nChannel.edit({
            name: oChannel.name,
            position: oChannel.position,
            topic: oChannel.topic,
            nsfw: oChannel.nsfw,
            rateLimitPerUser: oChannel.rateLimitPerUser,
        });
    } else if (nChannel.type === "GUILD_VOICE") {
        nChannel.edit({
            name: oChannel.name,
            position: oChannel.position,
            bitrate: oChannel.bitrate,
            userLimit: oChannel.userLimit
        })
    }
    const log = client.channels.cache.find(x => x.name === "guard-log")
    const mesajknk = new MessageEmbed().setTitle('Wex - Kanal Güncelleme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından <#${oChannel.id}> isimli kanalı güncellemeye çalıştı ve onu jaile attım.`).setTimestamp()
    if (log) {
        log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
    }

}

exports.conf = {
    event: "channelUpdate",
}