const client = global.GuardThree
const { MessageEmbed } = require('discord.js')
const bots = require('../../Configs/whitelist')
exports.execute = async (member) => {
    let entry = await member.guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD" }).then(dens => dens.entries.first());
    
    if (bots.bots.includes(entry.executor.id)) return
    if (!entry || !entry.executor || await client.checkPermission(client, entry.executor.id, "full")|| await client.checkPermission(client, entry.executor.id, "banandkick")) return
    member.guild.members.ban(entry.executor.id, { reason: 'Dens - Sağ Tık Ban Koruması'}).catch(err => console.log(`Etkinlik: ${exports.conf.event}\nError: ${err}`))
    member.guild.members.unban(member.user.id, "Sağ Tık İle Ban Yediği İçin Geri Açıldı.")
    const log = client.channels.cache.find(x => x.name === "guard-log")
    const mesajknk = new MessageEmbed().setTitle('Wex - Sağ Tık Ban Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` adlı kullancı **${member.user.tag}** \`(${member.user.id})\` adlı kullanıcıya sağ tık ban attığı için banladım ve banlanan kullanıcının banını kaldırdım.`).setTimestamp()
    if (log) {
        log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
    }
    return;
}

exports.conf = {
    event: "guildBanAdd",
}