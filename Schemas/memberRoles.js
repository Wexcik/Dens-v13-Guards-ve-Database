const mongoose = require('mongoose');

const MemberRoles = mongoose.Schema({
    guildID: String,
    userID: String,
    roles: Array
})

module.exports = mongoose.model("member-roles", MemberRoles)