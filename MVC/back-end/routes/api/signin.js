const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcryptjs");
require('dotenv').config();

//ROUTER

router.get("/", (req,res) => {
  if (req.session.isLoggedIn){
    return res.redirect("/test");
  }
  return res.render("signin.ejs", {errorMessage: req.flash("successMessage")})
})


router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    const checkuseremail = await pool.query(
      'SELECT * FROM soauser WHERE email = $1',
      [email]
    );

    if (checkuseremail.rows.length === 0){ //user does not exist
      return res.status(401).json({Message: "User with that mail does not exist"})
    }

    const checkpassword = await bcrypt.compare(password, checkuseremail.rows[0].password);
    if (!checkpassword){
      return res.status(401).json({Message: "User's email and password do not match"});
    }


    req.session.isLoggedIn = true;
    req.session.user = {
      id: checkuseremail.rows[0].user_id,
      email: email
    }
    req.flash("successMessage", "Επιτυχής Είσοδος")
    return res.redirect("/test");


  } catch (err) {
    //res.status(401).json({ Message: "User with that mail does not exist" });
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;