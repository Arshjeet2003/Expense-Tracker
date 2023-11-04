const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js');
const User_friend_rel = require('../models/FriendRel.js');

// ROUTE 1: Get all the friends of user using: GET "/api/friends/getfriends".
router.get('/getfriends', fetchuser, async (req, res) => {
    const userId = req.user.id; // Replace with the user's ID for whom you want to retrieve friends

try {
    // Step 1: Find all documents in FriendRel where userId matches either userid1 or userid2
    const friends = await User_friend_rel.find({
        $or: [
            { userid1: userId },
            { userid2: userId }
        ]
    }).exec();

    // Step 2: Retrieve friend details from the User model for each friend
    const friendDetails = await Promise.all(friends.map(async (friendRel) => {
        const friendUserId = friendRel.userid1===userId ? friendRel.userid2 : friendRel.userid1;
        const friendUser = await User.findById(friendUserId);
        return friendUser;
    }));

    // Step 3: Send the user's friends as a response
    res.status(200).json(friendDetails);
    } catch (error) {
        // Handle any errors, such as database errors
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }

});

// ROUTE 2: Add a new friend using: POST "/api/friends/addfriend".
router.post('/addfriend/:id',fetchuser,async (req,res)=>{
    const userId1 = req.user.id; // Replace with the user's ID initiating the friend request
    const userId2 = req.params.id; // Replace with the ID of the user being added as a friend

try {
    // Create a new FriendRel document to represent the friendship
    const friendRel = new User_friend_rel({
        userid1: userId1,
        userid2: userId2
    });

    // Save the new friendship document using a try...catch block
    await friendRel.save();

    // Successfully added a friend
    res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        // Handle any errors, e.g., duplicate friend requests or other issues
        res.status(500).json({ message: "Error adding friend" });
    }

})

// ROUTE 3: Delete an existing friend using: DELETE "/api/friends/deletefriend".
router.delete('/deletefriend/:id',fetchuser, async (req,res)=>{
    const userId1 = req.user.id; // Replace with the user's ID initiating the friend removal
    const friendIdToDelete = req.params.id; // Replace with the ID of the friend to be deleted

try {
    // Step 1: Find the friend relationship document by matching either userid1 or userid2
    const friendRel = await User_friend_rel.findOne({
        $or: [
            { userid1: userId1, userid2: friendIdToDelete },
            { userid1: friendIdToDelete, userid2: userId1 }
        ]
    }).exec();

    if (!friendRel) {
        // Handle the case where the friend relationship is not found
        res.status(404).json({ message: "Friend not found" });
    } else {
        // Step 2: Remove the friend relationship document
        await friendRel.deleteOne();

        // Successfully deleted the friend relationship
        res.status(200).json({ message: "Friend deleted successfully" });
    }
}
    catch (error) {
        // Handle any errors, e.g., database errors
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }

});

module.exports = router;

