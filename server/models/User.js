const mongoose = require('mongoose');
const Transaction = require('./Transactions');
const Groups = require('./Groups');
const {Schema} = mongoose;

const UserSchema = new mongoose.Schema(
    {
        _id: String,
        name: String,
        email: String,
        password: String,
        transactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        }],
        groups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Groups'
        }],
        date:{
            type: Date,
            default: Date.now
        }
    }
)
const User = mongoose.model('user',UserSchema);
module.exports = User;