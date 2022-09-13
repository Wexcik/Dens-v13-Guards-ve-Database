const CMaker = require('../Client.Maker');
const { Discord, Intents, Collection } = require('discord.js');
const zeze = require('zezedb');
const botConfig = require('../Configs/botConfig')
const { safeList } = require('../SafeandMongoLoader')
const GuardFour = global.GuardFour = new CMaker({
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

zeze(GuardFour, {
  console: true,
});

//GuardThree.databaseBağla()
GuardFour.commands = new Collection()
GuardFour.aliases = new Collection()
GuardFour.loadEvents("Guard4")
require('./Utill/functionHandler')(GuardFour)
GuardFour.loadCommands("Guard4", GuardFour.commands, GuardFour.aliases)
GuardFour.login(global.botConfig.Tokens.Guard4)
