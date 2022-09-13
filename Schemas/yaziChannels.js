const mongoose = require('mongoose');

const catagory = mongoose.model("Catagory", mongoose.Schema({
    guildID: String,
    roles: Array,
}));

module.exports = catagory