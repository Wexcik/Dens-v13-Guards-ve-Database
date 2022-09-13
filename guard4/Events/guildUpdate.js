const client = global.GuardTwo
const { MessageEmbed } = require('discord.js')
const request = require('request');
const bots = require('../../Configs/whitelist')
exports.execute = async (oldGuild, newGuild) => {
    let entry = await nChannel.fetchAuditLogs({ type: "GUILD_UPDATE" }).then(udit => udit.entries.first());
    if (bots.bots.includes(entry.executor.id)) return
    if (!entry || !entry.executor) return
 
    if(newGuild.vanityURLCode && (newGuild.vanityURLCode !== global.botConfig.SunucuURL)){
      const spammer = setInterval(async() => {

            request({
                url: `https://discord.com/api/v8/guilds/${newGuild.id}/vanity-url`,
            body: {
                code: SunucuURL
            },
            json: true,
            method: 'PATCH',
            headers: {
                "Authorization": `Bot ${client.token}`
            }
        }, (err,res,body) => {
            if(err){
                console.log(err)
            }
        })
    })
    }
        newGuild.members.ban(entry.executor.id, { reason: "Wex - URL Koruması."}).catch(err => console.log(err))
        client.ytKapat(guild.id)
        const log = client.channels.cache.find(x => x.name === "guard-log")
        const mesajknk = new MessageEmbed().setTitle('Wex - Sunucu Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` Sunucunun **URL**'si ile oynadığı için url yi alıp banladım.`).setTimestamp()
        if (log) {
            log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
        }

}

exports.conf = {
    event: "guildUpdate",
}
