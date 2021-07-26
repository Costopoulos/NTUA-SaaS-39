const express = require("express");
const router = express.Router();
const pool = require("../../database.js");
const bcrypt = require("bcryptjs");
require('dotenv').config();


router.post("/", async (req, res) => {
  try {
    const { email, password1, password2 } = req.body;
    if (email.length === 0 || password1.length === 0){
      return res.status(400).json({Message: "Fill all fields!"})
    }

    if (password1 !== password2){
      return res.status(400).json({Message: "Passwords do not match"})
    }

    const salt = await bcrypt.genSalt();
    const sela = await Promise.all([bcrypt.hash(password1, salt)]);
    const newUser = await pool.query(
      "INSERT INTO auth_user (email, password) VALUES ($1, $2) RETURNING *;",
      [email, sela[0]]
    );

    return res.json({Message: "Successfully signed up"})

  } catch (err) {
    return res.status(400).json({ Message: "User with this email already exists" });
  }
});

module.exports = router;

