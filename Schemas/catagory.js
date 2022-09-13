const mongoose = require('mongoose');

const catagory = mongoose.model("catagory", mongoose.Schema({
    guildID: String,
    channelID: String,
    name: String,
    position: Number,
    overwrites: Array,
}));

module.exports = catagory