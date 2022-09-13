const client = global.GuardTwo
const { MessageEmbed } = require('discord.js')
const bots = require('../../Configs/whitelist')
const roles = require('../../Schemas/roles')
exports.execute = async (oRole, nRole) => {
    let entry = await nRole.guild.fetchAuditLogs({ type: "ROLE_UPDATE" }).then(dens => dens.entries.first());
    if (bots.bots.includes(entry.executor.id)) return
    if (!entry || !entry.executor || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return
    nRole.members.ban(entry.executor.id, { reason: "Wex - Rol Güncelleme Koruması."}).catch(err => console.log(err))
    const roleData = await roles.findOne({roleID: oRole.id})
    nRole.edit({
        name: roleData ? roleData.name : oldRole.name,
        color: roleData ? roleData.color : oldRole.color,
        hoist: roleData ? roleData.hoist : oldRole.hoist,
        permissions: roleData ? roleData.permissions : oldRole.permissions,
        mentionable: roleData ? roleData.mentionable : oldRole.mentionable
    })
    const log = client.channels.cache.find(x => x.name === "guard-log")
    const mesajknk = new MessageEmbed().setTitle('Wex - Rol güncelleme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından <@&${oRole.id}> isimli rolü güncellemeye çalıştı ve onu jaile attım.`).setTimestamp()
    if (log) {
        log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
    }
    return;
}

exports.conf = {
    event: "roleUpdate",
}