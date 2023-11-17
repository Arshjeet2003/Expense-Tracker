const mongoose = require('mongoose');
const {Schema} = mongoose;

const FinancialGoalsSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        savingsGoal: Number,
        date:{
            type: Date,
            default: Date.now
        },
        startDate:{
            type: Date,
            default: null
        },
        endDate:{
            type: Date,
            default: null
        },
    }
)
const FinancialGoals = mongoose.model('financialGoals',FinancialGoalsSchema);
module.exports = FinancialGoals;