const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const { validate } = require("../models/User");

//                   Register 

router.post("/register", async (req,res) => {

    try{
        // Generating new Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        
        // Creating new user

        const newUser = new User({

            username:req.body.username,
            email:req.body.email,
            password:hashedPassword

        });

        const user = await newUser.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }
});


//                     Login 

router.post("/login", async (req,res) => {

    try{
        // Finding user

        const user = await User.findOne({username:req.body.username})
        !user && res.status(400).json("Wrong username or Password");

        // validate password 

        const validPassword = await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(400).json("Wrong username or Password");

        // All OK

        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;