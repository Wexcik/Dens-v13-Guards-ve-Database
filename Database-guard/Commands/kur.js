const rolesm = require("../../Schemas/roles");
const client = global.Database
const Discord = require('discord.js')
exports.execute = async(client, message, args) => {
    let roles = await rolesm.findOne({guildID: message.guild.id, roleID: args[0]})
    let newRole = message.guild.roles.cache.get(roles)
    if(!newRole || newRole == undefined){
        newRole = await message.guild.roles.create({
            permissions: roles.permissions,
            color: Number(roles.color) ? Number(roles.color): roles.color,
            hoist: roles.hoist,
            mentionable: roles.mentionable,
            name: roles.name
        }).then(x => x.setPosition(roles.position))
    }
    let membersCount = roles.members.length
    let clientsCount = global.tokens.length
    let countUser = membersCount % clientsCount
    let perUser = Math.floor(membersCount/clientsCount);
    let messages = `**${message.member.user.tag}** \`(${message.member.id})\` tarafından, <@&${newRole.id}> rol oluşturuldu! **${clientsCount}** adet bot **${membersCount}** adet üyeye rolleri geri dağıtılmaya başlandı! \n(Ortalama Gerçekleşecek Süre: **${(membersCount > 1000 ? parseInt((membersCount * (250 / 1000)) / 60) + " dakika" : parseInt(membersCount * (250 / 1000)) + " saniye")}**)`
    message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(messages)]})
    setTimeout(() => {
        let kanalPermVeri = roles.channelOverwrites;
        if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
            let kanal = message.guild.channels.cache.get(perm.channelid);
            if(!kanal) return
          setTimeout(() => {
            let yeniKanalPermVeri = {};
            perm.allow.forEach(p => {
              yeniKanalPermVeri[p] = true;
            });
            perm.deny.forEach(p => {
              yeniKanalPermVeri[p] = false;
            });
            kanal.permissionOverwrites.create(newRole, yeniKanalPermVeri).catch(error => console.log(error));
          }, index*300);
        });
    }, 500)
    let members = roles.members
    dagit(newRole.id, members)
}

exports.conf = {
    name: "kur",
    owner: true,
    cooldown: 0,
    aliases: ["kur"]
}


async function dagit(role, rMembers) {
  
    for (let i = 0; i < rMembers.length; i++) {
      const cle = global.tokens[Math.floor(Math.random() * global.tokens.length)];
      cle.user.setPresence({acitivies: [{name: global.botConfig.DagiticiBotOynuyor}], status: "idle"})
      const guild = cle.guilds.cache.get(global.botConfig.GuildID);
      const rolee = guild.roles.cache.find((r) => r.id === role); if (!rolee) return;
      const member = guild.members.cache.find((x) => x.id === rMembers[i]); if (!member) return;
      member.roles.add(rolee).catch(() => {});
      await new Promise((r) => setTimeout(r, 250));
      if(i > rMembers.length && i == rMembers.length){
        cle.user.setPresence({ status: "invisible"})
      }
    };
  }        
  