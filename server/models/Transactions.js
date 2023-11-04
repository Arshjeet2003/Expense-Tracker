const mongoose = require('mongoose');
const {Schema} = mongoose;

const TransactionSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        category: String,
        recurring: String,
        repeat: String,
        date:{
            type: Date,
            default: Date.now
        }
    }
)
const Transaction = mongoose.model('transaction',TransactionSchema);
module.exports = Transaction;