const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js');
const Transaction = require('../models/Transactions');

// ROUTE 1: Get all the transactions of user using: GET "/api/transactions/gettransactions".
router.get('/gettransactions', fetchuser, async (req, res) => {
    const userId = req.user.id;
    const { search = "" } = req.query;

try {
    // Step 1: Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
        // Handle the case where the user is not found
        return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Retrieve the transaction IDs from the user's transactions
    const transactionIds = user.transactions;
    const transactions = await Transaction.find({
        $and: [
            { name: { $regex: new RegExp(search, "i") } },
            { _id: { $in: transactionIds } }
        ]
    });

    const total = await Transaction.countDocuments({
        name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
    } catch (error) {
        // Handle any potential errors, such as database errors
        return res.status(500).json({ message: "Internal server error" });
    }
});

// ROUTE 2: Add a new transaction using: POST "/api/transactions/addtransaction".
router.post('/addtransaction',fetchuser,async (req,res)=>{
    try {
        const {name,category,type,recurring,repeat,price} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const new_transaction = new Transaction({
            name,category,type,recurring,repeat,price
        })
        const userId = req.user.id;
        const user = await User.findById(userId);
        user.transactions.push(new_transaction);
        await user.save();
        await new_transaction.save();
        res.send(new_transaction);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Delete an existing transaction using: DELETE "/api/transactions/deletetransaction".
router.delete('/deletetransaction/:id',fetchuser, async (req,res)=>{
    try {
        const userId = req.user.id;
        const transactionIdToDelete = req.params.id;
        // Step 1: Find the user
        const user = await User.findById(userId);

        if (!user) {
            // Handle the case where the user is not found
            return res.status(404).json({ message: "User not found" });
        }

        // Step 2: Remove the specific transaction from the transactions array
        const transactionIndex = user.transactions.findIndex(
            (transaction) => transaction._id.toString() === transactionIdToDelete
        );

        if (transactionIndex === -1) {
            // Handle the case where the transaction is not found
            return res.status(404).json({ message: "Transaction not found" });
        }

        user.transactions.splice(transactionIndex, 1);

        // Step 3: Save the user to persist the changes
        await user.save();

        // Step 1: Find the transaction by ID and remove it
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionIdToDelete);

        if (!deletedTransaction) {
        // Handle the case where the transaction is not found
        return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({"Success" : "Transaction has been deleted"});
    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4: Update an existing transaction using: PUT "/api/transactions/updatetransaction".
router.put('/updatetransaction/:id',fetchuser, async (req,res)=>{
    const {name,category,type,recurring,repeat,price} = req.body;

    const transactionIdToUpdate = req.params.id;
    
    const updatedTransactionData = {
        name,category,type,recurring,repeat,price
    }

    // Step 1: Update the transaction by its ID
    const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionIdToUpdate,{$set:updatedTransactionData},{ new: true }
    );
    
    if (!updatedTransaction) {
        // Handle the case where the transaction is not found
        return res.status(404).json({ message: "Transaction not found" });
    }

    // You can then send a response or perform any additional actions as needed.
    res.send(updatedTransaction);
});


module.exports = router;

