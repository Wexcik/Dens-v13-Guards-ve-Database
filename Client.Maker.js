const { Client } = require('discord.js')
const path = require("path")
const stuffs = require('stuffs')
const readdirRecursive = require('recursive-readdir')
const chillout = require('chillout')
const mongoose = require('mongoose')
class CMaker extends Client {
    constructor(options) {
        super(options)

        this.botConfig = global.botConfig = require('./Configs/botConfig')
        this.roleConfig = global.roleConfig = require('./Configs/roleConfig')
        this.on("ready", async() => {
            await console.log(`(${this.user.username}) olarak giriş yapıldı!`)
        })
    }

    async loadEvents(dirpat) {
        let eventPath = path.resolve(`./${dirpat}/Events`)
        await stuffs.makeSureFolderExists(eventPath)
        let eventFiles = await readdirRecursive(eventPath);
        await chillout.forEach(eventFiles, (eventFile) => {
            let event = require(eventFile);
            let bsname = eventFile.split('\\').pop().split('/').pop();
            console.log(`(${bsname.replace('.js', '')}) adlı event yüklendi.`)
            this.on(event.conf.event, event.execute);
        });
    }

    async loadCommands(dirpat, cmdCollection, aliCollection) {
        let commandPath = path.resolve(`./${dirpat}/Commands`)
        await stuffs.makeSureFolderExists(commandPath)
        let commandFiles = await readdirRecursive(commandPath);
        await chillout.forEach(commandFiles, (commandFile) => {
            let command = require(commandFile);
            let bsname = commandFile.split('\\').pop().split('/').pop();
            cmdCollection.set(command.conf.name, command);
            console.log(`(${bsname.replace('.js', '')}) adlı komut yüklendi.`)
            command.conf.aliases.forEach(aliases => aliCollection.set(aliases, command));
        });
    }
    async databaseBağla() {
        let dbconnecttime = Date.now()
        const dbAyar = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        };

        mongoose.connect(global.botConfig.MongoURL, dbAyar)

        mongoose.connection.on('connected', () => {
            console.log(`\nMongo bağlantısı kuruldu! Databaseye bağlanması (${Date.now() - dbconnecttime})ms sürdü.`);
        });

        mongoose.connection.on('err', err => {
            console.error(`Mongo bağlantı hatası: \n${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Mongo bağlantısı kesildi!');
        });
    }
}

module.exports = CMaker