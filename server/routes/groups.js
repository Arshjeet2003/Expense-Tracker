const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js');
const Groups = require('../models/Groups.js');

// ROUTE 1: Get all the groups of user using: GET "/api/groups/getgroups".
router.get('/getgroups', fetchuser, async (req, res) => {
    const userId = req.user.id;

try {
    // Step 1: Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
        // Handle the case where the user is not found
        return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Retrieve the grp IDs from the user's transactions
    const grpIds = user.groups;

    // Step 3: Use .populate() to retrieve the grp documents
    const grps = await Groups.find({ _id: { $in: grpIds } });

    // Step 4: Send the retrieved grp as a response
    res.status(200).json(grps);
    } catch (error) {
        // Handle any potential errors, such as database errors
        return res.status(500).json({ message: "Internal server error" });
    }
});

// ROUTE 2: Add a new groups using: POST "/api/groups/addgroup".
router.post('/addgroup',fetchuser,async (req,res)=>{
    try {
        const {name,description} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const new_grp = new Groups({
            name,description
        })
        const userId = req.user.id;
        const user = await User.findById(userId);
        user.groups.push(new_grp);
        new_grp.users.push(userId);
        await user.save();
        await new_grp.save();
        res.send(new_grp);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Delete an existing grp using: DELETE "/api/groups/deletegroup".
router.delete('/deletegroup/:id',fetchuser, async (req,res)=>{
    try {
        const userId = req.user.id;
        const grpIdToDelete = req.params.id;
        // Step 1: Find the user
        const user = await User.findById(userId);

        if (!user) {
            // Handle the case where the user is not found
            return res.status(404).json({ message: "User not found" });
        }

        // Step 2: Remove the specific transaction from the transactions array
        const grpIndex = user.groups.findIndex(
            (group) => group._id.toString() === grpIdToDelete
        );

        if (grpIndex === -1) {
            // Handle the case where the transaction is not found
            return res.status(404).json({ message: "Group not found" });
        }

        user.groups.splice(grpIndex, 1);

        // Step 3: Save the user to persist the changes
        await user.save();

        // Step 1: Find the grp by ID and remove it
        const deletedGrp = await Groups.findByIdAndDelete(grpIdToDelete);

        if (!deletedGrp) {
        // Handle the case where the grp is not found
        return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({"Success" : "Transaction has been deleted"});
    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4: Add a new member using: POST "/api/groups/add/:grpId/:userId".
router.post('/add/:grpId/:userId',fetchuser,async (req,res)=>{
    try {
        const grpIdToAdd = req.params.grpId;
        const userToAdd = req.params.userId;

        // Step 1: Find the grp by ID
        const toAddGrp = await Groups.findById(grpIdToAdd);
        const memberIndex = toAddGrp.users.findIndex(
            (user) => user === userToAdd
        );
        if(memberIndex === -1) {
            toAddGrp.users.push(userToAdd);
        }
        else{
            //member already present
            return res.status(404).json({ message: "Member already present" });
        }
        await toAddGrp.save();
        const user = await User.findById(userToAdd);
        //Add grp id to the user
        user.groups.push(grpIdToAdd);
        await user.save();
        res.send(toAddGrp);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 5: Delete a member using: POST "/api/groups/delete/:grpId/:userId".
router.delete('/delete/:grpId/:userId',fetchuser,async (req,res)=>{
    try {
        const grpIdToOperate = req.params.grpId;
        const userToDelete = req.params.userId;

        // Step 1: Find the grp by ID
        const toOperateGrp = await Groups.findById(grpIdToOperate);
        
        const memberIndex = toOperateGrp.users.findIndex(
            (user) => user === userToDelete
        );

        if (memberIndex === -1) {
            // Handle the case where the member is not found
            return res.status(404).json({ message: "Member not found" });
        }

        toOperateGrp.users.splice(memberIndex, 1);

        // Step 3: Save the user to persist the changes
        await toOperateGrp.save();

        const user = await User.findById(userToDelete);
        const grpIndex = user.groups.findIndex(
            (group) => group._id.toString() === grpIdToOperate
        );
        if (grpIndex === -1) {
            // Handle the case where the member is not found
            return res.status(404).json({ message: "Group not found" });
        }
        user.groups.splice(grpIndex,1);
        await user.save();

        res.send(toOperateGrp);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 6: Update an existing grp using: PUT "/api/groups/updategroup".
router.put('/updategroup/:id',fetchuser, async (req,res)=>{
    try {
        const {name,description} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const new_grp = ({
            name,description
        })
        const grpIdToUpdate = req.params.id;

        // Step 1: Find the grp by ID and update it
        const updatedGrp = await Groups.findByIdAndUpdate(grpIdToUpdate,{$set:new_grp},{new: true});

        if (!updatedGrp) {
        // Handle the case where the grp is not found
        return res.status(404).json({ message: "Transaction not found" });
        }
        res.json({"Success" : "Group has been updated"});
    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 7: Get group based on id using: GET "/api/groups/getgroups/id".
router.get('/getgroups/:id', fetchuser, async (req, res) => {
    const grpId = req.params.id;

try {

    // Step 3: Use .populate() to retrieve the grp documents
    const grp = await Groups.findOne({ _id: { $in: grpId } });

    // Step 4: Send the retrieved grp as a response
    res.status(200).json(grp);
    } catch (error) {
        // Handle any potential errors, such as database errors
        return res.status(500).json({ message: "Internal server error" });
    }
});

// ROUTE 8: Add a new transaction using: POST "/api/groups/addTransaction/:grpId".
router.post('/addTransaction/:grpId',fetchuser,async (req,res)=>{
    try {
        const grpIdToAdd = req.params.grpId;
        const userId = req.user.id;
        const {groupMember,price} = req.body;

        // Step 1: Find the grp by ID
        const toAddGrp = await Groups.findById(grpIdToAdd);
        toAddGrp.groupTransactions.push({groupMember,userId,price});
        await toAddGrp.save();
        res.send(toAddGrp);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 9: Get group transactions using: GET "/api/groups/getTransaction/:grpId".
router.get('/getTransaction/:grpId', fetchuser, async (req, res) => {
    const grpId = req.params.grpId;

try {
    const grp = await Groups.findById(grpId);
    res.status(200).json(grp.groupTransactions);
    } catch (error) {
        // Handle any potential errors, such as database errors
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

