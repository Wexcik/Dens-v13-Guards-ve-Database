const mongoose = require('mongoose');

const sesChannels = mongoose.model("VoiceChannels", mongoose.Schema({
    guildID: String,
    channelID: String,
    name: String,
    bitrate: Number,
    parentID: String,
    position: Number,
    overwrites: Array,
}));

module.exports = sesChannels