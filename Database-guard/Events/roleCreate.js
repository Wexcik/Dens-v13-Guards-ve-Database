const client = global.Database
const { MessageEmbed } = require('discord.js')
const bots = require('../../Configs/whitelist')
exports.execute = async (role) => {
    let entry = await role.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(dens => dens.entries.first());
    if (bots.bots.includes(entry.executor.id)) return
    if (!entry || !entry.executor || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "rolr") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return
    await role.guild.members.ban(entry.executor.id, { reason: "Wex - Rol Açma Koruması" })
    await role.delete({ reason: "Wex Rol Oluşturma Koruması" }).catch(err => console.log(`Event: ${exports.conf.event}\nError: ${err}`))
    const log = client.channels.cache.find(x => x.name === "guard-log")
    const mesajknk = new MessageEmbed().setTitle('Wex - Rol oluşturma Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından bir rol oluşturmaya çalıştı ve onu jaile attım.`).setTimestamp()
    if (log) {
        log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
    }
    return;
}

exports.conf = {
    event: "roleCreate",
}