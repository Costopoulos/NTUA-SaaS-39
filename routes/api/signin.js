const express = require("express");
const router = express.Router();
const axios = require('axios')
const jwt = require("jsonwebtoken");
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
    const {email, password} = req.body;

    axios.post("http://localhost:7000/signin",{
      email: email,
      password: password
    })
    .then((response)=>{
      // console.log(response)
      const verify = response.data.verify;
      // console.log(verify);
      // console.log(response);
      const token = response.data.token
      req.session.isLoggedIn = true;
      req.session.user = {
        id: verify.user,
        email: email,
        token: token
      }
      req.session.save( () => {
        req.flash("successMessage", "Successful Login");
        return res.redirect("/");
      });
      // req.flash("successMessage", "Successful Login");
      // return res.redirect("/");

    }, (error) => {
      // console.log(error.response.data['Message']);
      // res.status(400).json({ Message: "User with this email already exists" });
      req.flash("errorMessage", error.response.data['Message'])
      return res.redirect("/signin");
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