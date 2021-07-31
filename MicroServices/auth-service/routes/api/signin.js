const express = require("express");
const router = express.Router();
const pool = require("../../database.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.length === 0 || password.length === 0){
        return res.status(400).json({Message: "Fill all fields!"})
    }

    const checkuseremail = await pool.query(
      "SELECT * FROM auth_user WHERE email = $1",
      [email]
    );

    if (checkuseremail.rows.length === 0){ //user does not exist
      return res.status(401).json({Message: "User with that email does not exist"})
    }

    const checkpassword = await bcrypt.compare(password, checkuseremail.rows[0].password);
    if (!checkpassword){
      return res.status(401).json({Message: "User's email and password do not match"});
    }
    
    //create token
    const payload = {
      user: checkuseremail.rows[0].user_id,
      email: checkuseremail.rows[0].email
    }
    token = jwt.sign(payload, process.env.jwtSecret, {expiresIn: 3600}); 
    // console.log(token);
    res.json({token});


  } catch (err) {
    // res.status(401).json({ Message: "User with that mail does not exist" });
    console.log("edw");
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;