const CMaker = require('../Client.Maker');
const { Discord, Intents, Collection } = require('discord.js');
const botConfig = require('../Configs/botConfig')
const zeze = require('zezedb');

const { safeList } = require('../SafeandMongoLoader')
const GuardFive = global.GuardFive = new CMaker({
    fetchAllMembers: true,
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_PRESENCES
    ],
   
})

zeze(GuardFive, {
  console: true,
});

//GuardTwo.databaseBağla()
GuardFive.commands = new Collection()
GuardFive.aliases = new Collection()
GuardFive.loadEvents("Guard5")
require('./Utill/functionHandler')(GuardFive)
GuardFive.loadCommands("Guard5", GuardFive.commands, GuardFive.aliases)
GuardFive.login(global.botConfig.Tokens.Guard5)