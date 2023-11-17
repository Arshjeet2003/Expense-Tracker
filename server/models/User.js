const mongoose = require('mongoose');
const Transaction = require('./Transactions');
const Groups = require('./Groups');
const FinancialGoals = require('./FinancialGoals');
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
        financialGoals: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FinancialGoals'
        }],
        groups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Groups'
        }],
        date:{
            type: Date,
            default: Date.now
        },
        imageUrl: String,
        currencyType: String
    }
)
const User = mongoose.model('user',UserSchema);
module.exports = User;