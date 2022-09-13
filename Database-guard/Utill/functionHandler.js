const guvenliListe = require('../../Schemas/guvenliList')
const whitelist = require('../../Configs/whitelist')
const { GuildMember } = require('discord.js')
const SafeMember = require('../../Schemas/guvenliList')
module.exports =async (client) => {

    client.checkExec = async(kisiID) => {
        let uye = client.guilds.cache.get(global.botConfig.GuildID).members.cache.get(kisiID);
        let guvenliler = whitelist.guvenli || [];
        if (!uye || uye.id === client.user.id || global.botConfig.Owners.some( x=> uye.id === x) || uye.id === uye.guild.owner.id || guvenliler.some(g => uye.id === g.slice(1) || uye.roles.cache.has(g.slice(1)))) return true
        else return false;
    }
    client.ytKapat = async (guildID) =>  {
        const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"]
        const guild = client.guilds.cache.get(guildID)
        guild.roles.cache.filter(rol => rol.editable).filter(rol => yetkiPermleri.some(yetki => rol.permissions.has(yetki))).forEach(async (rol) => rol.setPermissions(0n));
      }
    client.checkPermission = async(bots, id, type) => {
        let member = bots.guilds.cache.get(global.botConfig.GuildID).members.cache.get(id)
        let res = await SafeMember.findOne({
            guildID: global.botConfig.GuildID
        });

      
      
            if (global.botConfig.Owners.some(uye => uye == member?member.id:false) || res.Full.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false) || client.user.id == member?member.id:false /*|| Guard2.user.id == member?member.id:false  || Guard3.user.id == member?member.id:false  || Guard4.user.id == member?member.id:false || Guard5.user.id == member?member.id:false */) {
                return true;
            }
            if (type == "full") {
                if (res.Full.some(uye => uye == id || member ? member.roles.cache.has(uye) : false)) return true;
            } else if (type == "role") {
                if (res.Role.some(uye => uye == id || member ? member.roles.cache.has(uye) : false)) return true;
            } else if (type == "roleandchannel") {
                if (res.RoleAndChannel.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) return true;
            } else if (type == "channel") {
                if (res.Channel.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false || member ? member.voice ? member.voice.channel.id == uye : false : false)) return true;
            } else if (type == "banandkick") {
                if (res.BanAndKick.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false) || res.RoleAndChannel.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) return true;
            } else if (type == "bot") {
                if (res.Bot.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) return true;
            } else if (type == "chatguard") {
                if (res.ChatG.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) return true;
            } else return false;
        
      }
}