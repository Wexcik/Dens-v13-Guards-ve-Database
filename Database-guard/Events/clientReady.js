
const roles = require('../../Schemas/roles');
const { Discord, Permissions } = require('discord.js')
const mongoose = require('mongoose');
const yaziChannels = require('../../Schemas/yaziChannels');
const sesChannels = require('../../Schemas/sesChannels');
const catagory = require('../../Schemas/catagory');

exports.execute = async () => {
    setTimeout(async() => {

    const guild = global.Database.guilds.cache.get(global.botConfig.GuildID)
    //global.Database.channels.cache.get('903709277666050048').send({content: `\`\`\`js\n Database ve bot girdi.\`\`\``})    
    if (!guild) return console.log('BotConfig dosyasında sunucuID giriniz.')
    guild.roles.cache.forEach(async (rol) => {
        let rOvrW = [];
        guild.channels.cache.filter(k => k.permissionOverwrites.cache.has(rol.id)).forEach(async x => {
            am = x.permissionOverwrites.cache
            am.map(async w => {
                let data = {channelid: x.id,id: w.id, allow: new Permissions(w.allow.bitfield).toArray(), deny: new Permissions(w.deny.bitfield).toArray() }
                rOvrW.push(data)
            })
        })
        await roles.findOne({ guildID: global.botConfig.GuildID, roleID: rol.id }, async (err, res) => {
            if (!res) {
                let yRolSchema = new roles({
                    _id: new mongoose.Types.ObjectId(),
                    guildID: global.botConfig.GuildID,
                    roleID: rol.id,
                    name: rol.name,
                    color: rol.hexColor, 
                    hoist: rol.hoist,
                    rawPosition: rol.rawPosition,
                    permissions: rol.permissions.bitfield,
                    mentionable: rol.mentionable,
                    time: Date.now(),
                    members: rol.members.map(uye => uye.id),
                    channelOverwrites: rOvrW
                    
                })
                yRolSchema.save()
            } else {
                res.name = rol.name;
                res.color = rol.color;
                res.hoist = rol.hoist;
                res.rawPosition = rol.rawPosition;
                res.permissions = rol.permissions.bitfield;
                res.mentionable = rol.mentionable;
                res.time = Date.now();
                res.members = rol.members.map(m => m.id);
                res.channelOverwrites = rOvrW;
                res.save();
            }
        })
    })
    roles.find({ guildID: global.botConfig.GuildID }).sort().exec((err, rols) => {
        rols.filter(r => !guild.roles.cache.has(r.roleID) && Date.now()-r.time > 1000*60*60*24*3).forEach(r => {//1 saatte bir alır. Süreyi değiştirebilirsiinz.
        roles.findOneAndDelete({roleID: r.roleID}); 
     })
    console.log('Rol Backup alındı! Değişmiş olan verilerde değiştirildi!')
    })
    


            guild.channels.cache.forEach(async channel => {
                let textPerms = []
                xx = channel.permissionOverwrites.cache.map(async w => {
                    let data = {id: w.id, type: w.type, allow: new Permissions(w.allow.bitfield).toArray(), deny: new Permissions(w.deny.bitfield).toArray()}
                    textPerms.push(data)
                })

            if((channel.type === "GUILD_TEXT") || (channel.type === "GUILD_NEWS")){
                await yaziChannels.findOne({guildID: global.botConfig.GuildID, channelID: channel.id}, async(err, backup) => {
                    if(!backup){
                        let yeniKanalData = new yaziChannels({
                            guildID: global.botConfig.GuildID,
                            channelID: channel.id,
                            parentID: channel.parentId,
                            name: channel.name,
                            position: channel.position,
                            rateLimit: channel.rateLimitPerUser,
                            overwrites: textPerms,
                            nsfw: channel.nsfw
                        });
                        await yeniKanalData.save()
                    } else {
                        backup.parentID = channel.parentId
                        backup.name = channel.name
                        backup.position = channel.position
                        backup.rateLimit = channel.rateLimit
                        backup.nsfw = channel.nsfw
                        backup.overwrites = textPerms
                        backup.save()
                    };
                });
            }
        })
        guild.channels.cache.forEach(async channel => {
            let voicePerms = []
            xx = channel.permissionOverwrites.cache.map(async w => {
                let data = {id: w.id, type: w.type, allow: new Permissions(w.allow.bitfield).toArray(), deny: new Permissions(w.deny.bitfield).toArray()}
                voicePerms.push(data)
            })
            if(channel.type === "GUILD_VOICE"){
                await sesChannels.findOne({guildID: global.botConfig.GuildID, channelID: channel.id}, async (err,res) => {
                    if(!res){
                        let yeniKanalDatas = new sesChannels({
                            guildID: global.botConfig.GuildID,
                            channelID: channel.id,
                            parentID: channel.parentId,
                            name: channel.name,
                            position: channel.position,
                            bitrate: channel.bitrate,
                            overwrites: voicePerms,
                        });
                        await yeniKanalDatas.save()
                    } else {
                        res.parentID = channel.parentId
                        res.name = channel.name
                        res.position = channel.position
                        res.bitrate = channel.bitrate
                        res.overwrites = voicePerms
                        res.save()
                    }
                });
            }
        })
        guild.channels.cache.forEach(async channel => {
            let catagPerms = []
            xx = channel.permissionOverwrites.cache.map(async w => {
                let data = {id: w.id, type: w.type, allow: new Permissions(w.allow.bitfield).toArray(), deny: new Permissions(w.deny.bitfield).toArray()}
                catagPerms.push(data)
            })
            if(channel.type === "GUILD_CATEGORY"){
                await catagory.findOne({ guildID: global.botConfig.GuildID, channelID: channel.id}, async(err,res) => {
                    if(!res){
                        let yeniCatag = new catagory({
                            guildID: global.botConfig.GuildID,
                            channelID: channel.id,
                            name: channel.name,
                            position: channel.position,
                            overwrites: catagPerms
                        });
                        await yeniCatag.save()
                    } else {
                        res.name = channel.name
                        res.position = channel.position
                        res.overwrites = catagPerms
                        res.save()
                    }
                })
            }
            
        })
            console.log('Kanal Backup alındı! Değişmiş olan verilerde değiştirildi!')
            
        
    
}, 3000)
    
}
exports.conf = {
    event: "ready",
};