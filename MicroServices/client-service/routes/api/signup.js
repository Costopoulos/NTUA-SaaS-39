const express = require("express");
const router = express.Router();
const pool = require("../../database");
const bcrypt = require("bcryptjs");
const axios = require('axios')
// const jwt = require("jsonwebtoken");
// var redis = require('redis');
// var JWTR =  require('jwt-redis').default;
// var redisClient = redis.createClient();
// var jwtr = new JWTR(redisClient);
require('dotenv').config();

//const { genSalt } = require("bcrypt");

//ROUTER

//THIS

// router.post("/", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const newUser = await pool.query(
//       "INSERT INTO mvcuser (email, password) VALUES ($1, $2) RETURNING *",
//       [email, password]
//     );
//     res.json(newUser.rows[0]);
//   } catch (err) {
//     res.status(400).json({ Message: "User already exists" });
//   }
// });

// bcrypt.genSalt(10).then(result => { //genSalt generates a hash of 10 digits
//     let password1 = bcrypt.hash(password, result)
// }).then(password1 => {
//     const newUser = pool.query(
//         "INSERT INTO mvcuser (email, password) VALUES ($1, $2) RETURNING *",
//         [email, password1]
//     )

// }).then(res.json(newUser.rows[0]))

// const salt = bcrypt.genSalt();
// let password1 = bcrypt.hash(password, salt);

//   const newUser = await pool.query(
//     `INSERT INTO mvcuser (email, password) VALUES (${email}, crypt:(${password}, gen_salt('bf', 8))`
//   );
//   res.json(newUser.rows[0]);

//THIS

// router.post("/", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const salt = await bcrypt.genSalt();
//     console.log(salt);
//     let password1 = await bcrypt.hash(password, salt);
//     //console.log(password1);
//     const newUser = await pool.query(
//       "INSERT INTO mvcuser (email, password) VALUES ($1, $2) RETURNING *",
//       [email, password1]
//     );
//     // console.log()
//     res.json(newUser.rows[0]);
//   } catch (err) {
//     res.status(400).json({ Message: "User already exists" });
//   }
// });

router.get("/", (req,res) => {
  if (req.session.isLoggedIn){
    return res.redirect("/");
  }
  return res.render("signup.ejs", {successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
})

router.post("/", async (req, res) => {
  // try {

    const {email, password1, password2} = req.body;

    axios.post("http://localhost:7000/signup",{
      email: email,
      password1: password1,
      password2: password2
    })
    .then((response)=>{
      // console.log(response);
      req.flash("successMessage", "Successful Signup")
      return res.redirect("/signin");

    }, (error) => {
      // console.log(error.response.data['Message']);
      // res.status(400).json({ Message: "User with this email already exists" });
      req.flash("errorMessage", error.response.data['Message'])
      return res.redirect("/signup");
    });

    


  // } catch (err) {
  //   res.status(400).json({ Message: "User with this swta already exists" });
  // }
});

module.exports = router;

