const client = global.Database
const roles = require('../../Schemas/roles')
const SafeMember = require('../../Schemas/guvenliList')
const silinenRoller = require('../../Schemas/deletedRoles')
const { MessageEmbed } = require('discord.js')
exports.execute = async (role) => {
    let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
    let arr = []
    arr.push({roleid: role.id, silen: entry.executor.id, time: Date.now()})
    silinenRoller.findOne({guildID: global.botConfig.GuildID}, async(err,res) => {
      if(!res){

        let yenisi = new silinenRoller({
          guildID: global.botConfig.GuildID,
          roles: arr
        })
        yenisi.save()
      }else {
        res.roles.push({roleid: role.id, silen: entry.executor.id, time: Date.now()})
        res.save()
      }
    })
    if (!entry || !entry.executor || await client.checkPermission(client, entry.executor.id, "full")) return;
    //client.punish(entry.executor.id, "ban");
    //role.guild.members.ban(entry.executor.id, { reason: "Wex - Rol Silme Koruma." }).catch(err => { })
    let newRole = await role.guild.roles.create({
      name: role.name,
      color: role.hexColor,
      hoist: role.hoist,
      position: role.rawPosition,
      permissions: role.permissions,
      mentionable: role.mentionable,
    })

    roles.findOne({guildID: role.guild.id, roleID: role.id}, async(err, res) => {
        if(!res) return;
        setTimeout(() => {
            let kanalPermVeri = res.channelOverwrites;
            if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
                let kanal = role.guild.channels.cache.get(perm.channelid);
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

        let roleMembers = res.members;
       dagit(newRole.id, roleMembers);
    })

    const log = client.channels.cache.find(x => x.name === "guard-log")
    const mesajknk = new MessageEmbed().setTitle('Wex - Rol silme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından <@&${newRole.id}> isimli rolü silmeye çalıştı, rolü açıp herkese dağıtmaya başladım.`).setTimestamp()
    if (log) {
        log.send({ embeds: [mesajknk] }).catch(err => console.log(err))
    }
}

exports.conf = {
    event: "roleDelete",
}

async function dagit(role, rMembers) {
  for (let i = 0; i < rMembers.length; i++) {
    const cle = global.tokens[Math.floor(Math.random() * global.tokens.length)];
    const guild = cle.guilds.cache.get(global.botConfig.GuildID);
    const rolee = guild.roles.cache.find((r) => r.id === role); if (!rolee) return;
    const member = guild.members.cache.find((x) => x.id === rMembers[i]); if (!member) return;
    member.roles.add(rolee).catch(() => {});
    await new Promise((r) => setTimeout(r, 250));
    if(i > rMembers.length && i == rMembers.length){
    }
  };
}        
