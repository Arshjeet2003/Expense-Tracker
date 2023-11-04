const mongoose = require('mongoose');
const {Schema} = mongoose;

const FriendRelSchema = new mongoose.Schema(
    {
        userid1:{
            type: String,
            ref: 'user'
        },
        userid2:{
            type: String,
            ref: 'user'
        },
    }
)
const User_friend_rel = mongoose.model('user_friend_rel',FriendRelSchema);
module.exports = User_friend_rel;