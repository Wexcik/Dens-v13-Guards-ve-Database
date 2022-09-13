const CMaker = require('../Client.Maker');
const { Discord, Intents, Collection } = require('discord.js');
const zeze = require('zezedb');
const botConfig = require('../Configs/botConfig')
const { safeList } = require('../SafeandMongoLoader')
const GuardThree = global.GuardThree = new CMaker({
    fetchAllMembers: true,
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ],
   
})

zeze(GuardThree, {
    console: true,
});

//GuardThree.databaseBağla()
GuardThree.commands = new Collection()
GuardThree.aliases = new Collection()
GuardThree.loadEvents("Guard3")
require('./Utill/functionHandler')(GuardThree)
GuardThree.loadCommands("Guard3", GuardThree.commands, GuardThree.aliases)
GuardThree.login(global.botConfig.Tokens.Guard3)
