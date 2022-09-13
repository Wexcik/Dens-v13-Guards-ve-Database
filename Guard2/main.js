const CMaker = require('../Client.Maker');
const { Discord, Intents, Collection } = require('discord.js');
const botConfig = require('../Configs/botConfig')
const { safeList } = require('../SafeandMongoLoader')
const GuardTwo = global.GuardTwo = new CMaker({
    fetchAllMembers: true,
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_PRESENCES
    ],
   
})

const zeze = require('zezedb');
zeze(GuardTwo, {
    console: true,
});

//GuardTwo.databaseBağla()
GuardTwo.commands = new Collection()
GuardTwo.aliases = new Collection()
GuardTwo.loadEvents("Guard2")
require('./Utill/functionHandler')(GuardTwo)
GuardTwo.loadCommands("Guard2", GuardTwo.commands, GuardTwo.aliases)
GuardTwo.login(global.botConfig.Tokens.Guard2)
