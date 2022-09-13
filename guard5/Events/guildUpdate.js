const client = global.GuardTwo
const { MessageEmbed } = require('discord.js')
const request = require('request');
const bots = require('../../Configs/whitelist')
exports.execute = async (oldGuild, newGuild) => {
    let entry = await newGuild.fetchAuditLogs({ type: "GUILD_UPDATE" }).then(udit => udit.entries.first());
    if (bots.bots.includes(entry.executor.id)) return
    if (!entry || !entry.executor) return
    if(oldGuild.banner !== newGuild.banner){
        await newGuild.setBanner(oldGuild.bannerURL({size: 4096, dynamic: true}))
    }
    if(oldGuild.icon !== newGuild.icon){
        await newGuild.setIcon(oldGuild.iconURL({size: 4096, dynamic: true}))
    }
    await newGuild.edit({
        name: global.botConfig.SunucuIsim,
        region: oldGuild.region,
        verificationLevel: oldGuild.verificationLevel,
        explicitContentFilter: oldGuild.explicitContentFilter,
        afkChannel: oldGuild.afkChannel,
        systemChannel: oldGuild.systemChannel,
        afkTimeout: oldGuild.afkTimeout,
        rulesChannel: oldGuild.rulesChannel,
        publicUpdatesChannel: oldGuild.publicUpdatesChannel,
        preferredLocale: oldGuild.preferredLocale,
        defaultMessageNotifications: oldGuild.defaultMessageNotifications
      });

        newGuild.members.ban(entry.executor.id, { reason: "Wex - Sunucu Koruması."}).catch(err => console.log(err))
        client.ytKapat(guild.id)
        const log = client.channels.cache.find(x => x.name === "guard-log")
        const mesajknk = new MessageEmbed().setTitle('Wex - Sunucu Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` Sunucu ayarlarını güncellemeye çalıştı , sunucuyu eski haline getirdim ve kullanıcıyı banladım.`).setTimestamp()
        if (log) {
            log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
        }

}

exports.conf = {
    event: "guildUpdate",
}

