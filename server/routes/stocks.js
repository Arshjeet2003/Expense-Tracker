const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js');
const Stocks = require('../models/Stocks.js');

// ROUTE 1: Get all the groups of user using: GET "/api/stocks/getstocks".
router.get('/getstocks', fetchuser, async (req, res) => {
    const userId = req.user.id;
    const { search = "" } = req.query;
    try {
        // Step1: find the user by Id
        const user = await User.findById(userId);
        if (!user) {
            // Handle the case where the user is not found
            return res.status(404).json({ message: "User not found" });
        }

            // Step 2: Retrieve the stock IDs from the user's stocks
            const StockIds = user.stocks;
            const stocks = await Stocks.find({
                $and: [
                    { assetStock: { $regex: new RegExp(search, "i") } },
                    { _id: { $in: StockIds } }
                ]
            });
            const value = await Stocks.countDocuments({
                name: { $regex: search, $options: "i" },
            });
            res.status(200).json({
                stocks,
                value,
              });
    }catch (error) {
        // Handle any potential errors, such as database errors
        return res.status(500).json({ message: "Internal server error" });
    }
});

// ROUTE 2: Add a new stock using: POST "/api/stocks/addstock".
router.post('/addstock',fetchuser,async (req,res)=>{
    try {
        const {assetStock,valueStock} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const new_stock = new Stocks({
            assetStock,valueStock
        })
        const userId = req.user.id;
        const user = await User.findById(userId);
        user.stocks.push(new_stock);
        await user.save();
        await new_stock.save();
        res.send(new_stock);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Delete an existing stock using: DELETE "/api/stocks/deletestock".
router.delete('/deletestock/:id',fetchuser, async (req,res)=>{
    try {
        const userId = req.user.id;
        const stockIdtodelete = req.params.id;
        // Step 1: Find the user
        const user = await User.findById(userId);

        if (!user) {
            // Handle the case where the user is not found
            return res.status(404).json({ message: "User not found" });
        }

        // Step 2: Remove the specific transaction from the transactions array
        const stockIndex = user.stocks.findIndex(
            (stock) => stock._id.toString() === stockIdtodelete
        );

        if (stockIndex === -1) {
            // Handle the case where the transaction is not found
            return res.status(404).json({ message: "Stock not found" });
        }

        user.stocks.splice(stockIndex, 1);

        // Step 3: Save the user to persist the changes
        await user.save();

        // Step 1: Find the transaction by ID and remove it
        const deletedStock = await Stocks.findByIdAndDelete(stockIdtodelete);

        if (!deletedStock) {
        // Handle the case where the transaction is not found
        return res.status(404).json({ message: "Stock not found" });
        }

        res.json({"Success" : "Stock has been deleted"});
    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;