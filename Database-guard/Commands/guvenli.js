
const roles = require('../../Schemas/roles')
const SafeMember = require('../../Schemas/guvenliList')
const Discord = require('discord.js')

exports.execute = async (Database, message, args) => {
    if (!global.botConfig.Owners.includes(message.member.id)) return;
    let veri = await SafeMember.findOne({
        guildID: message.guild.id
    }) || {
        "Full": [],
        "RoleAndChannel": [],
        "Role": [],
        "Channel": [],
        "Bot": [],
        "BanAndKick": [],
        "ChatG": [],
        "Permissions": [],
        "SafeRole": []
    };
    let sec = args[0];
    if (!sec) return message.reply({ content: `**Doğru Kullanım**: **!güvenli ${["full", "rol&kanal", "rol", "kanal", "ban&kick", "bot", "chat", "grol"].map(x => `\`${x}\``).join(" - ")}**` });

    if (sec === "full") {
        if (!args[1]) {

            return message.channel.send({
                embeds: [new Discord.MessageEmbed().setDescription(`
            Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli full @etiket/@rol/ID** yazabilirsiniz!
            
            ${veri.Full.length > 0 ? veri.Full.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}
            
**YAPAMADIĞI İŞLEMLER**
\`- Bot Ekleme (Jail)
- URL Değiştirme (Ban)
- Güvenli Rolleri Silme (Ban)\`
            `)]
            })
        } else {
            let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]);
            if (!dats) return message.reply({ cntent: "Lütfen bir rol ID'si giriniz veya Rol Etiketleyiniz!" });
            if (veri.Full.includes(dats.id)) {
                message.channel.send({ content: `Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**Full**)` });
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $pull: {
                        Full: dats.id
                    }
                }, {
                    upsert: true
                });
            } else {
                message.channel.send({ content: `Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**Full**)` });
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $push: {
                        Full: dats.id
                    }
                }, {
                    upsert: true
                });
            }
        }
    }
    if (sec === "rol&kanal") {
        if (!args[1]) {

            return message.channel.send({
                embeds: [new Discord.MessageEmbed().setDescription(`
Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli rol&kanal @etiket/@rol/ID** yazabilirsiniz!
            
${veri.RoleAndChannel.length > 0 ? veri.RoleAndChannel.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}

**YAPAMADIĞI İŞLEMLER**
\`- Bot Ekleme (Jail)
- URL Değiştirme (Ban)
- Güvenli Rolleri Silme (Ban)
- Rol Silme (Ban)\`
`)]
            })
        } else {
            let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]);
            if (!dats) return message.reply({ content: "Lütfen bir rol ID'si giriniz veya Rol Etiketleyiniz!" });
            if (veri.RoleAndChannel.includes(dats.id)) {
                message.channel.send({ content: `Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**Rol And Channel**)` });
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $pull: {
                        RoleAndChannel: dats.id
                    }
                }, {
                    upsert: true
                });
            } else {
                message.channel.send({ content: `Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**Rol And Channel**)` });
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $push: {
                        RoleAndChannel: dats.id
                    }
                }, {
                    upsert: true
                });
            }
        }
    }
    if (sec === "kanal") {
        if (!args[1]) {

            return message.channel.send({
                embeds: [new Discord.MessageEmbed().setDescription(`
            Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli kanal @kanal/@rol/ID** yazabilirsiniz!
            
            ${veri.Channel.length > 0 ? veri.Channel.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x) ? message.guild.roles.cache.get(x) : message.guild.channels.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}
            
**YAPAMADIĞI İŞLEMLER**
\`- Bot Ekleme (Jail)
- URL Değiştirme (Ban)
- Güvenli Rolleri Silme (Ban)
- Rol Silme (Ban)
- Rol Verme (Jail)
- Rol Güncelleme (Jail)
- Rol Oluşturma (Jail)\`
`)]
            })
        } else {
            let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]) || message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            if (!dats && dats.type !== "GUILD_VOICE") return message.reply({content: "Lütfen bir Kişi & Rol & Ses Kanal ID'si giriniz veya Kişi & Rol & Ses Kanal Etiketleyiniz!"});
            if (veri.Channel.includes(dats.id)) {
                message.channel.send({content: `Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**Channel**)`});
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $pull: {
                        Channel: dats.id
                    }
                }, {
                    upsert: true
                });
            } else {
                message.channel.send({content: `Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**Channel**)`});
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $push: {
                        Channel: dats.id
                    }
                }, {
                    upsert: true
                });
            }
        }
    }
    if (sec === "rol") {
        if (!args[1]) {

            return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`
Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli rol @etiket/@rol/ID** yazabilirsiniz!
            
${veri.Role.length > 0 ? veri.Role.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}
            
**YAPAMADIĞI İŞLEMLER**
\`- Bot Ekleme (Jail)
- URL Değiştirme (Ban)
- Güvenli Rolleri Silme (Ban)
- Kanal Silme (Jail)
- Kanal Oluşturma (Jail)
- Kanal Güncelleme (Jail)\`
`)]})
        } else {
            let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]);
            if (!dats) return message.reply({content: "Lütfen bir rol ID'si giriniz veya Rol Etiketleyiniz!"});
            if (veri.Role.includes(dats.id)) {
                message.channel.send({content: `Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**Role**)`});
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $pull: {
                        Role: dats.id
                    }
                }, {
                    upsert: true
                });
            } else {
                message.channel.send({content: `Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**Role**)`});
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $push: {
                        Role: dats.id
                    }
                }, {
                    upsert: true
                });
            }
        }
    }
    if (sec === "ban&kick") {
        if (!args[1]) {

            return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`
            Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli ban&kick @etiket/@rol/ID** yazabilirsiniz!
            
${veri.BanAndKick.length > 0 ? veri.BanAndKick.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}
            
**YAPAMADIĞI İŞLEMLER**
\`- Bot Ekleme (Jail)
- URL Değiştirme (Ban)
- Güvenli Rolleri Silme (Ban)
- Kanal Silme (Jail)
- Kanal Oluşturma (Jail)
- Kanal Güncelleme (Jail)
- Rol Silme (Ban)
- Rol Verme (Jail)
- Rol Güncelleme (Jail)
- Rol Oluşturma (Jail)\`
`)]})
        } else {
            let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]);
            if (!dats) return message.reply({content: "Lütfen bir rol ID'si giriniz veya Rol Etiketleyiniz!"});
            if (veri.BanAndKick.includes(dats.id)) {
                message.channel.send({content: `Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**Ban and Kick**)`});
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $pull: {
                        BanAndKick: dats.id
                    }
                }, {
                    upsert: true
                });
            } else {
                message.channel.send({content: `Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**Ban and Kick**)`});
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $push: {
                        BanAndKick: dats.id
                    }
                }, {
                    upsert: true
                });
            }
        }
    }
    if (sec === "bot") {
        if (!args[1]) {
            return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`
Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli bot @etiket/@rol/ID** yazabilirsiniz!

${veri.Bot.length > 0 ? veri.Bot.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}

**YAPAMADIĞI İŞLEMLER**
\`- URL Değiştirme (Ban)
- Güvenli Rolleri Silme (Ban)
- Kanal Silme (Jail)
- Kanal Oluşturma (Jail)
- Kanal Güncelleme (Jail)
- Rol Silme (Ban)
- Rol Verme (Jail)
- Rol Güncelleme (Jail)
- Ban & Kick Kullanma (Jail)
- Rol Oluşturma (Jail)\`
`)]})
        } else {
            let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]);
            if (!dats) return message.reply({content: "Lütfen bir rol ID'si giriniz veya Rol Etiketleyiniz!"});
            if (veri.Bot.includes(dats.id)) {
                message.channel.send({content: `Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**Bot**)`});
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $pull: {
                        Bot: dats.id
                    }
                }, {
                    upsert: true
                });
            } else {
                message.channel.send({cotent: `Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**Bot**)`});
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $push: {
                        Bot: dats.id
                    }
                }, {
                    upsert: true
                });
            }
        }
    }
    if (sec === "chat") {
        if (!args[1]) {

            return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`
            Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli chat @etiket/@rol/#kanal/ID** yazabilirsiniz!
            
            ${veri.ChatG.length > 0 ? veri.ChatG.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x) ? message.guild.roles.cache.get(x) : message.guild.channels.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}`)]})
        } else {
            let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first();
            if (!dats) return message.reply({content: "Lütfen bir Rol / Kanal / Üye ID'si giriniz veya Rol / Kanal / Üye Etiketleyiniz!"});
            if (veri.ChatG.includes(dats.id)) {
                message.channel.send({content: `Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**ChatG**)`});
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $pull: {
                        ChatG: dats.id
                    }
                }, {
                    upsert: true
                });
            } else {
                message.channel.send({content: `Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**ChatG**)`});
                await SafeMember.updateOne({
                    guildID: message.guild.id
                }, {
                    $push: {
                        ChatG: dats.id
                    }
                }, {
                    upsert: true
                });
            }
        }
    }
    if (sec === "grol") {
        let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name === args.slice(1).join(" "));
        if (!rol) {

            return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`
            Güvenli roller listesine herhangi bir rol eklemek veya silmek için **!güvenli grol @rol/ID** yazabilirsiniz!
            
            ${veri.SafeRole.length > 0 ? veri.SafeRole.map(x => `${message.guild.roles.cache.get(x) ? message.guild.roles.cache.get(x) : x}`).join("\n") : "Herhangi bir rol güvenliye eklenmedi!"}`)]})
        }
        if (veri.SafeRole.includes(rol.id)) {
            await SafeMember.updateOne({ guildID: message.guild.id }, { $pull: { SafeRole: rol.id } }, { upsert: true });
            message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${rol}, ${message.author} tarafından güvenli rol listesinden kaldırıldı!`)]});
        } else {
            await SafeMember.updateOne({ guildID: message.guild.id }, { $push: { SafeRole: rol.id } }, { upsert: true });
            message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${rol}, ${message.author} tarafından güvenli rol listesine eklendi!`)]});
        };
    }else if(sec === "list" || sec === 'liste'){
        let embed = new Discord.MessageEmbed()
        let banankick;
            banankick = `${veri.BanAndKick.length > 0 ? veri.BanAndKick.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}`
            let bot;
            bot = `${veri.Bot.length > 0 ? veri.Bot.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}` 
            let chanl;
            chanl = `${veri.Channel.length > 0 ? veri.Channel.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x) ? message.guild.roles.cache.get(x) : message.guild.channels.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}` 
            let chatg;
            chatg = `${veri.ChatG.length > 0 ? veri.ChatG.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x) ? message.guild.roles.cache.get(x) : message.guild.channels.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}` 
            let full;
            full = `${veri.Full.length > 0 ? veri.Full.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}` 
            let rrole;
            rrole = `${veri.Role.length > 0 ? veri.Role.map(x => `${message.guild.roles.cache.get(x) ? message.guild.roles.cache.get(x) : x}`).join("\n") : "Herhangi bir rol güvenliye eklenmedi!"}` 
            let roleanchannel;
            roleanchannel = `${veri.RoleAndChannel.length > 0 ? veri.RoleAndChannel.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}` 
            let saferole;
            saferole =`${veri.SafeRole.length > 0 ? veri.SafeRole.map(x => `${message.guild.roles.cache.get(x) ? message.guild.roles.cache.get(x) : x}`).join("\n") : "Herhangi bir rol güvenliye eklenmedi!"}` 
            embed.addField(`Full`,`${full}`, true)
            embed.addField(`Güvenli Rol`,`${saferole}`, true)
            embed.addField(`Rol ve Kanal`,`${roleanchannel}`, true)
            embed.addField(`Chat Guard`,`${chatg}`, true)
            embed.addField(`Kanal`,`${chanl}`, true)
            embed.addField(`Rol`,`${rrole}`, true)
            embed.addField(`Bot`,`${bot}`, true)
            embed.addField(`Ban ve Kick`,`${banankick}`, true)
            return message.channel.send({embeds: [embed]})
    }

}

exports.conf = {
    name: "güvenli",
    owner: true,
    cooldown: 5,
    aliases: ["guvenli", "güvenli"],
    description: "",
    usage: "",
}