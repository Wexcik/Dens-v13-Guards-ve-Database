const client = global.GuardTwo
const { MessageEmbed } = require('discord.js')

const bots = require('../../Configs/whitelist')
exports.execute = async (member) => {
    let entry = await member.guild.fetchAuditLogs({ type: "BOT_ADD" }).then(udit => udit.entries.first());
    if (bots.bots.includes(entry.executor.id)) return

    if(member) member.ban(entry.executor.id, { reason: "Wex - Sunucu Koruması." }).catch(err => console.log(err))
    client.ytKapat(member.guild.id)
    const log = client.channels.cache.find(x => x.name === "guard-log")
    const mesajknk = new MessageEmbed().setTitle('Wex - Sunucu Koruması').setDescription(`${entry.executor} \`(${entry.executor.id})\` tarafından sunucuya bot eklendi! Sunucuya bot ekleyen kullanıcıyı ve botu sunucudan yasakladım.\nEklenen Bot: ${member} \`(${member.id})\``).setTimestamp()
    if (log) {
        log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
    }

}

exports.conf = {
    event: "guildMemberAdd",
}

