const mongoose = require('mongoose');
const Transaction = require('./Transactions');
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
        date:{
            type: Date,
            default: Date.now
        }
    }
)
const User = mongoose.model('user',UserSchema);
module.exports = User;