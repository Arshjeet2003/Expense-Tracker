const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'mysecretstring';
//ROUTE 1: create a user using: POST "/api/auth/createuser"
router.post('/createuser',[
    body('_id','Enter a valid username').isLength({min: 3}),
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Must be atleast 5 characters').isLength({min: 5})
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry a user with this email exists"})
        }
        let id = await User.findOne({_id: req.body._id});
        if(id){
            return res.status(400).json({error: "Sorry a user with this email exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);

        user = await User.create({
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        currencyType: "INR"
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        res.json(authtoken);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2: authenticate a user using: POST "/api/auth/login"
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
], async (req,res)=>{
    let success=false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success,errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success,error: "Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/getuser', fetchuser, async (req, res) => {
    const { search = "" } = req.query;
    try {
        if (search.length === 0) {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } else {
            const users = await User.find({
                _id: { $regex: search, $options: "i" },
            }).select("-password");
            res.send(users);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/getcurrentuser", fetchuser, async (req, res) => {
  try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 4: Update an existing user using: PUT "/api/auth/updateuser".
router.put('/updateuser',fetchuser, async (req,res)=>{
    const {name,email,old_password,new_password} = req.body;
    try {
        const newUser = {};
        if(name){newUser.name = name};
        if(email){newUser.email = email};

        let user = await User.findOne({email});

        const passwordCompare = await bcrypt.compare(old_password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(new_password,salt);

        if(secPass){newUser.secPass = secPass};

        user_update = await User.findByIdAndUpdate(req.user.id,{$set:newUser},{new:true});
        res.json({user_update});
    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 5: Update a currency for a user using: PUT "/api/auth/updatecurrency".
router.put('/updatecurrency', fetchuser, async (req, res) => {
    const { new_currency } = req.body;

    try {
        // Find the user by ID
        let user = await User.findById(req.user.id);

        // Update the currencyType field
        user.currencyType = new_currency;

        // Save the updated user
        const user_update = await user.save();

        res.json({ user_update });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;