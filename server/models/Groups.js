const mongoose = require('mongoose');
const {Schema} = mongoose;

const GroupSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        users: [{
            type: String,
            ref: 'User'
        }],
        groupTransactions: [{
            groupMember: String,
            userId: String,
            price: Number,
            currencyTypeGroup: String,
        }],
        date:{
            type: Date,
            default: Date.now
        }
    }
)
const Groups = mongoose.model('group',GroupSchema);
module.exports = Groups;