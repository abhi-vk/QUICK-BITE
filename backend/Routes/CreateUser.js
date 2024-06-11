const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = "ufhipiuwahefgiowauefhwioeuafhwdfvcsavgwaedsgweg";


router.post("/Createuser", [
    body('email', 'Incorrect email').isEmail(),
    body('name').isLength({min: 5}),
    body('password', 'Incorrect password').isLength({min: 5})
    ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt) // always generates unique hash

    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({
            success: true
        });

    } catch (error) {
        console.log(error)
        res.json({
            success: false
        });

    }
})
router.post("/loginuser", [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Invalid password').isLength({
        min: 5
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        let email = req.body.email;
        let userData = await User.findOne({
            email
        })
        if (!userData) {
            return res.status(400).json({
                errors: "Invalid Email"
            });
        }

    const passCompare = await bcrypt.compare(req.body.password, userData.password) // true or false function
        if(!passCompare ){
          return res.status(400).json({ errors: "Invalid Password" });
        }
    const data =  {
        user:{
        id : userData.id
          }
        }
    const authToken = jwt.sign( data, secret)
    
    return res.json({success:true, authToken : authToken})
    
            
      
    } catch (error) {
        console.log(error)
        res.send({
            success: false
        });
    }
});
module.exports = router;