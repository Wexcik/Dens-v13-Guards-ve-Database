const CMaker = require('../Client.Maker');
const { Discord, Intents, Collection , Client} = require('discord.js');
const botConfig = require('../Configs/botConfig')
const { safeList } = require('../SafeandMongoLoader')
const Database = global.Database = new CMaker({
    fetchAllMembers: true,
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES
  ],
})
Database.commands = new Collection()
Database.aliases = new Collection()
Database.loadEvents("Database-guard")

const zeze = require('zezedb');
zeze(Database, {
    console: true,
});

require('./Utill/functionHandler')(Database)
Database.loadCommands("Database-guard", Database.commands, Database.aliases)
Database.login(global.botConfig.Tokens.Database)

let arr = botConfig.Dagiticiler
let tokens = global.tokens = []

for (data of arr) {
  let bot = new Client({ fetchAllMembers: true ,intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
  presence: { status: "idle"}
});
  bot.login(data).then(c => console.log(`${bot.user.tag} olarak giriş yapıldı!`)).catch(err => console.error(err));
  tokens.push(bot)
}

global.safeList = safeList