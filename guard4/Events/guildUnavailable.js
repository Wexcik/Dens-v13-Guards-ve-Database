const client = global.GuardTwo
const { MessageEmbed } = require('discord.js')
const bots = require('../../Configs/whitelist')
exports.execute = async (guild) => {

    try{
        client.ytKapat(guild.id)
        const log = client.channels.cache.find(x => x.name === "guard-log")
        const mesajknk = new MessageEmbed().setTitle('Wex - Sunucu Koruması').setDescription(`Sunucu ulaşılamaz hale geldiği için güvenlik sebebiyle yetkiler kapatıldı!`).setTimestamp()
        if (log) {
            log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
        }
    }catch(err){
        console.log(err)
    }

}

exports.conf = {
    event: "guildUnavailable",
}