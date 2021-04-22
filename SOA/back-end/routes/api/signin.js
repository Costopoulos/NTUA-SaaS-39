const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//ROUTER

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkuseremail = await pool.query(
      "SELECT * FROM soauser WHERE email = $1",
      [email]
    );

    if (checkuseremail.rows.length === 0){ //user does not exist
      return res.status(401).json({Message: "User with that mail does not exist"})
    }

    const checkpassword = await bcrypt.compare(password, checkuseremail.rows[0].password);
    if (!checkpassword){
      return res.status(401).json({Message: "User's email and password do not match"});
    }

    //console.log(checkpassword)
    
    //create token
    const payload = {
      user: checkuseremail.rows[0].user_id
    }
    token = jwt.sign(payload, process.env.jwtSecret, {expiresIn: 3600});
    res.json({token});


  } catch (err) {
    //res.status(401).json({ Message: "User with that mail does not exist" });
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;