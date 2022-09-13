exports.execute = async(client, message, args) => {
    if (args.join(" ").toLowerCase().includes('token')) return message.channel.send({content: "Wow, you're smart."})
    const clean = text => {
        if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }
    try {
        const code = args.join(" ");
        let evaled = await eval(code);
        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
        message.channel.send({content: `\`\`\`js\n${clean(evaled)}\`\`\``});
    } catch (err) {
        message.channel.send({content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``});
    }
}

exports.conf = {
    name: "eval",
    owner: true,
    cooldown: 5,
    aliases: [],
    description: "Sunucu Stat ayarları.",
    usage: "panel [seçim] [ayar]",
}