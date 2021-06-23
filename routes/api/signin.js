const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcryptjs");
require('dotenv').config();

//ROUTER

router.get("/", (req,res) => {
  if (req.session.isLoggedIn){
    return res.redirect("/");
  }
  return res.render("signin.ejs", {successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
})


router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    const checkuseremail = await pool.query(
      "SELECT * FROM soauser WHERE email = $1;",
      [email]
    );

    if (checkuseremail.rows.length === 0){ //user does not exist
      // return res.status(401).json({Message: "User with that mail does not exist"})
      req.flash("errorMessage", "User with this email does not exist");
      return res.redirect("/signin");
    }

    const checkpassword = await bcrypt.compare(password, checkuseremail.rows[0].password);
    if (!checkpassword){
      // return res.status(401).json({Message: "User's email and password do not match"});
      req.flash("errorMessage", "User's email and password do not match");
      return res.redirect("/signin");
    }


    req.session.isLoggedIn = true;
    req.session.user = {
      id: checkuseremail.rows[0].user_id,
      email: email
    }
    req.session.save( () => {
      req.flash("successMessage", "Successful Login");
      return res.redirect("/");
    });
    // req.flash("successMessage", "Successful Login");
    // return res.redirect("/");


  } catch (err) {
    //res.status(401).json({ Message: "User with that mail does not exist" });
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;