const mongoose = require('mongoose');

const MemberRoles = mongoose.Schema({
    guildID: String,
    roles: Array,
})

module.exports = mongoose.model("deleted-roles", MemberRoles)