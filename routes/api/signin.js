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

    axios.post("http://localhost:5000/signin",{
      email: email,
      password: password
    })
    .then((response)=>{
      // console.log(response.data.token);
      const token = response.data.token;
      // const tokenisexpired = await pool.query(
      //   "SELECT token_id FROM expired_tokens WHERE token_id = $1",
      //   [token]
      // )
      // if (tokenisexpired.rows[0]) res.status(200).json({Message: "Token already expired"});
      
      const verify = jwt.verify(token, process.env.jwtSecret);
      // req.user = verify.user;
      // next();
      // console.log(verify);
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
      console.log(error);
      res.status(400).json({ Message: "User with this  already exists" });
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