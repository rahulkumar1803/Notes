const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/FetchUser')


//Route 1: Create a user using: POST "/api/auth/CreateUser". Doesn't require auth
router.post('/CreateUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 })
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let success;
    // Check whether the user with this email exits already
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'This email alreday exist' })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //Create a new User
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        // console.log(authtoken)

        // res.json({ "msg": "User successfully registered" });
        res.json({ authtoken });


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }

})


//Route 2: Create a user using: POST "/api/auth/login". Auth require
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let success = false;
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            // success = false;
            return res.status(400).json({ error: "Please try to login with valid credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ error: "Please try to login with valid credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET)
        success = true;
        res.json({ success,authtoken,email });

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})


// Route 3:Get User Details using Post "/api/auth/getuser", Login required
router.post('/getuser', fetchUser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }

})
module.exports = router


// simplest format to store data in mongodb
// router.post('/',(req,res) => {
//     console.log(req.body)
//     const user = User(req.body);
//     user.save()
//     res.send(req.body);
// })