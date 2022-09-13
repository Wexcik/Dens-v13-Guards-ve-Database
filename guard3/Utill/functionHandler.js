const guvenliListe = require('../../Schemas/guvenliList')
const whitelist = require('../../Configs/whitelist')
const SafeMember = require('../../Schemas/guvenliList')
const Discord = require('discord.js')
module.exports = async (client) => {

    client.checkExec = async (kisiID) => {
        let uye = client.guilds.cache.get(global.botConfig.GuildID).members.cache.get(kisiID);
        let guvenliler = whitelist.guvenli || [];
        if (!uye || uye.id === client.user.id || global.botConfig.Owners.some(x => uye.id === x) || uye.id === uye.guild.owner.id || guvenliler.some(g => uye.id === g.slice(1) || uye.roles.cache.has(g.slice(1)))) return true
        else return false;
    }
    Discord.GuildMember.prototype.setRoles = function (roles) {
        const newRoles = this.roles.cache.filter(x => x.managed).map(x => x.id).concat(roles);
        return this.roles.set(newRoles)
      };
    client.checkPermission = async (bots, id, type) => {
        let member = bots.guilds.cache.get(global.botConfig.GuildID).members.cache.get(id)
        let res = await SafeMember.findOne({
            guildID: global.botConfig.GuildID
        });


        //if (global.botConfig.Owners.some(uye => uye == member ? member.id : false) || res.Full.some(uye => uye == member ? member.id : false || member ? member.roles.cache.has(uye) : false) || client.user.id == member ? member.id : false /*|| Guard2.user.id == member?member.id:false  || Guard3.user.id == member?member.id:false  || Guard4.user.id == member?member.id:false || Guard5.user.id == member?member.id:false */) {
        //    return true;
        //}
        if (type == "full") {
            if (global.botConfig.Owners.some(x => x == member ? member.id : false) || res.Full.some(uye => uye == member ? member.id : false || member ? member.roles.cache.has(uye) : false) || client.user.id == member ? member.id : false ) return true;
        } if (type == "role") {
            if (!res.Role.length) return false
            if (lobal.botConfig.Owners.some(x => x == member ? member.id : false) || res.Role.some(uye => uye == member ? member.id : false || member ? member.roles.cache.has(uye) : false) || client.user.id == member ? member.id : false ) return true;
        } if (type == "roleandchannel") {
            if (!res.RoleAndChannel.length) return false
            if (lobal.botConfig.Owners.some(x => x == member ? member.id : false) || res.RoleAndChannel.some(uye => uye == member ? member.id : false || member ? member.roles.cache.has(uye) : false) || client.user.id == member ? member.id : false) return true;
        } if (type == "channel") {
            if (!res.Channel.length) return false
            if (res.Channel.some(uye => uye == member ? member.id : false || member ? member.roles.cache.has(uye) : false || member ? member.voice ? member.voice.channel.id == uye : false : false)) return true;
        } if (type == "banandkick") {
            if (!res.BanAndKick.length) return false
            if (res.BanAndKick.some(uye => uye == member ? member.id : false || member ? member.roles.cache.has(uye) : false) || res.RoleAndChannel.some(uye => uye == member ? member.id : false || member ? member.roles.cache.has(uye) : false)) return true;
        } if (type == "bot") {
            if (!res.Bot.length) return false
            if (res.Bot.some(uye => uye == member ? member.id : false || member ? member.roles.cache.has(uye) : false)) return true;
        } if (type == "chatguard") {
            if (!res.Role.length) return false
            if (res.ChatG.some(uye => uye == member ? member.id : false || member ? member.roles.cache.has(uye) : false)) return true;
        } else return false;

    }
}