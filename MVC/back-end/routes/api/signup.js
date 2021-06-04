const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  return res.render("signup.ejs", {errorMessage: req.flash("successMessage")})
})

router.post("/", async (req, res) => {
  try {
    const { email, password1, password2 } = req.body;
    // console.log(req.body)
    if (password1 !== password2){
      req.flash("successMessage", "Λανθασμένος συνδυασμός κωδικών")
      return res.redirect("/signup")
    }

    const salt = await bcrypt.genSalt();
    const sela = await Promise.all([bcrypt.hash(password1, salt)]);
    const newUser = await pool.query(
      "INSERT INTO soauser (email, password) VALUES ($1, $2) RETURNING *;",
      [email, sela[0]]
    );

    // console.log(newUser.rows[0].id);

    // res.json(newUser.rows[0]);
    //create token
    // const payload = {
    //   user: newUser.rows[0].user_id
    // }
    // token = jwt.sign(payload, process.env.jwtSecret, {expiresIn: 300});
    // // console.log(token)
    // res.json({token});

    req.flash("successMessage", "Successful Signup")
    return res.redirect("/signin");


  } catch (err) {
    res.status(400).json({ Message: "User with this email already exists" });
  }
});

module.exports = router;

