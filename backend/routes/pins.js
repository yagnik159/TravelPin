const router = require("express").Router();
const express = require("express");
const Pin = require("../models/Pin");
const app = express();
app.use(express.json());
// This should be async function because saving new Pin takes some time and we can just directly send our status so we use await


// Use Pin Schema to create new Object of Pin and send it to home page and save it to DB
// When you need to send data from a client (let's say, a browser) to your API, you send it as a request body. A request body is data sent by the client to your API. A response body is the data your API sends to the client. 

// Got Body in request and sending response as savedPin back 

router.post("/", async (req,res) => {

    const newPin = new Pin(req.body);

    try{
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);

    }catch(err){
        res.status(500).json(err);
    }
});


router.post("/delete", async (req,res) => {

    const newPin = new Pin(req.body);
    pinId = newPin._id;
    try{

        Pin.deleteOne({_id : pinId},function(err){
            if(err){
                console.log(err);
            }
        })
        res.status(200).json(newPin);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

// This sends all the pins stored in our database to the homepage

router.get("/", async (req,res) => {

    try{
        const pins = await Pin.find();
        res.status(200).json(pins);

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;