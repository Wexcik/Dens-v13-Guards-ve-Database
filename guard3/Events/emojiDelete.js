const client = global.GuardThree
const { MessageEmbed } = require('discord.js')
const bots = require('../../Configs/whitelist')
exports.execute = async (emoji) => {
    let entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(dens => dens.entries.first());
    
    if (bots.bots.includes(entry.executor.id)) return
    if (!entry || !entry.executor || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return
    const uye = emoji.guild.members.cache.get(entry.executor.id)
    await emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(err => console.log(`Etkinlik: ${exports.conf.event}\nError: ${err}`))
    await uye.setRoles(global.roleConfig.JailRole, `Cezalı, Yetkili:${client.user.tag}`).catch(err => console.log(`Etlinlik: ${exports.conf.name} \nError: ${err}`))
    const log = client.channels.cache.find(x => x.name === "guard-log")
    const mesajknk = new MessageEmbed().setTitle('Wex - Emoji silme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından emoji silmeye çalıştı ve onu jaile attım.`).setTimestamp()
    if (log) {
        log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
    }
    return;
}

exports.conf = {
    event: "emojiDelete",
}