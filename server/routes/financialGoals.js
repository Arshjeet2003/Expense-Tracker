const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js');
const Transaction = require('../models/Transactions');
const FinancialGoals = require('../models/FinancialGoals.js');

// ROUTE 1: Get all the financial goals of user using: GET "/api/financialGoals/getfinancialGoals".
router.get('/getfinancialGoals', fetchuser, async (req, res) => {
    const userId = req.user.id;
    const { search = "" } = req.query;

try {
    // Step 1: Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
        // Handle the case where the user is not found
        return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Retrieve the financialGoal IDs from the user's financial goals
    const financialGoalIds = user.financialGoals;
    const financialgoals = await FinancialGoals.find({
        $and: [
            { name: { $regex: new RegExp(search, "i") } },
            { _id: { $in: financialGoalIds } }
        ]
    });

    res.status(200).json({
      financialgoals
    });
    } catch (error) {
        // Handle any potential errors, such as database errors
        return res.status(500).json({ message: "Internal server error" });
    }
});

// ROUTE 2: Add a new financial goal using: POST "/api/financialGoals/addfinancialGoals".
router.post('/addfinancialGoals',fetchuser,async (req,res)=>{
    try {
        const {name,description,savingsGoal,startDate,endDate} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const new_financialGoals = new FinancialGoals({
            name,description,savingsGoal,startDate,endDate
        })
        const userId = req.user.id;
        const user = await User.findById(userId);
        user.financialGoals.push(new_financialGoals);
        await user.save();
        await new_financialGoals.save();
        res.send(new_financialGoals);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Delete an existing financial Goal using: DELETE "/api/financialGoals/deletefinancialGoals".
router.delete('/deletefinancialGoals/:id',fetchuser, async (req,res)=>{
    try {
        const userId = req.user.id;
        const financialGoalsIdToDelete = req.params.id;
        // Step 1: Find the user
        const user = await User.findById(userId);

        if (!user) {
            // Handle the case where the user is not found
            return res.status(404).json({ message: "User not found" });
        }

        // Step 2: Remove the specific financialGoal from the financialGoals array
        const financialGoalIndex = user.financialGoals.findIndex(
            (financialGoal) => financialGoal._id.toString() === financialGoalsIdToDelete
        );

        if (financialGoalIndex === -1) {
            // Handle the case where the financialGoal is not found
            return res.status(404).json({ message: "financialGoal not found" });
        }

        user.financialGoals.splice(financialGoalIndex, 1);

        // Step 3: Save the user to persist the changes
        await user.save();

        // Step 1: Find the transaction by ID and remove it
        const deletedfinancialGoal = await FinancialGoals.findByIdAndDelete(financialGoalsIdToDelete);

        if (!deletedfinancialGoal) {
        // Handle the case where the transaction is not found
        return res.status(404).json({ message: "Financial Goal not found" });
        }

        res.json({"Success" : "Financial Goal has been deleted"});
    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

