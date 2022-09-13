(async () => {
    const botConfig = global.botConfig = require('./Configs/botConfig')    
    const safeDatabase = require('./Schemas/guvenliList');
    const mongoose = require('mongoose')
    
    
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
    let safeList;
    const data = await safeDatabase.findOne({ guildID: global.botConfig.GuildID })
    if(!data){
        let a = new safeDatabase({
            guildID: global.botConfig.GuildID,
            Full: global.botConfig.Owners
        })
        a.save()
        safeList = a
    }else {
        safeList = data
        data.save()
    }
    safeList = global.safeList = data
 
    module.exports = { safeList }
    
    
})()