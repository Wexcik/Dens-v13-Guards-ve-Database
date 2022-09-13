const client = global.GuardTwo
const { MessageEmbed } = require('discord.js');
const catagory = require('../../Schemas/catagory');
const sesChannels = require('../../Schemas/sesChannels');
const yaziChannels = require('../../Schemas/yaziChannels');
const bots = require('../../Configs/whitelist')
exports.execute = async (channel) => {

    let entry = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" }).then(udit => udit.entries.first());
    if (bots.bots.includes(entry.executor.id)) return
    if (!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return
    client.ytKapat(global.botConfig.GuildID)
    channel.guild.members.ban(entry.executor.id, { reason: "Wex - Kanal Silme Koruması"})
    let yenikanal;
    if ((channel.type === "GUILD_TEXT") || (channel.type === "GUILD_NEWS")) {
        yenikanal = await channel.guild.channels.create(channel.name, {
            type: channel.type,
            topic: channel.topic,
            nsfw: channel.nsfw,
            parent: channel.parent,
            position: channel.position + 1,
            rateLimitPerUser: channel.rateLimitPerUser
        })
    }

    if (channel.type === 'GUILD_VOICE') {
        yenikanal = await channel.guild.channels.create(channel.name, {
            type: channel.type,
            bitrate: channel.bitrate,
            userLimit: channel.userLimit,
            parent: channel.parent,
            position: channel.position + 1
        });
    }

    if (channel.type === 'GUILD_CATEGORY') {
        yenikanal = await channel.guild.channels.create(channel.name, {
            type: channel.type,
            position: channel.position + 1
        });

        const textChannels = await yaziChannels.find({ parentID: channel.id });
        await TextChannels.updateMany({ parentID: channel.id }, { parentID: yenikanal.id });
        textChannels.forEach(c => {
            const textChannel = channel.guild.channels.cache.get(c.channelID);
            if (textChannel) textChannel.setParent(yenikanal, { lockPermissions: false });
        });
        const voiceChannels = await sesChannels.find({ parentID: channel.id });
        await VoiceChannels.updateMany({ parentID: channel.id }, { parentID: yenikanal.id });
        voiceChannels.forEach(c => {
            const voiceChannel = channel.guild.channels.cache.get(c.channelID);
            if (voiceChannel) voiceChannel.setParent(yenikanal, { lockPermissions: false });
        });
    };

    channel.permissionOverwrites.cache.forEach(perm => {
        let thisPermOverwrites = {};
        perm.allow.toArray().forEach(p => {
            thisPermOverwrites[p] = true;
        });
        perm.deny.toArray().forEach(p => {
            thisPermOverwrites[p] = false;
        });
        yenikanal.permissionOverwrites.create(perm.id, thisPermOverwrites);
    });
    const log = client.channels.cache.find(x => x.name === "guard-log")
    const mesajknk = new MessageEmbed().setTitle('Wex - Kanal silme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından <#${channel.id}> isimli kanalı silmeye çalıştı, kanalı açıp ayarlarını düzeltiyorum ve kullanıcıyı jaile attım.`).setTimestamp()
    if (log) {
        log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
    }

}

exports.conf = {
    event: "channelDelete"
}

