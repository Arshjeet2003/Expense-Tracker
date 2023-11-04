const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = require('./User');

const GroupSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        users: [{
            type: String,
            ref: 'User'
        }],
        date:{
            type: Date,
            default: Date.now
        }
    }
)
const Groups = mongoose.model('group',GroupSchema);
module.exports = Groups;