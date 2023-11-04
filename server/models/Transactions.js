const mongoose = require('mongoose');
const {Schema} = mongoose;

const TransactionSchema = new mongoose.Schema(
    {
        name: String,
        category: String,
        type: String,
        recurring: String,
        repeat: String,
        price: Number,
        date:{
            type: Date,
            default: Date.now
        }
    }
)
const Transaction = mongoose.model('transaction',TransactionSchema);
module.exports = Transaction;