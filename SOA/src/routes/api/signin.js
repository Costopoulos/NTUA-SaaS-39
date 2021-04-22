const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcryptjs");

//ROUTER

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkemail = await pool.query(
      "SELECT * FROM soauser WHERE email = $1",
      [email]
    );
    const checkpass = await pool.query(
      "SELECT password FROM soauser WHERE email = $1"
    );
    if (checkpass !== password) {
      res.status(401).json({ Message: "Wrong Password" });
    } else {
    }
  } catch (err) {
    res.status(401).json({ Message: "User with that mail does not exist" });
  }
});
