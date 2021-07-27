const express = require("express");
const router = express.Router();
const axios = require('axios')
const jwt = require("jsonwebtoken");
require('dotenv').config();

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
        return res.json({token: token, verify: verify})
  
      }, (error) => {
        // console.log(error.response.data['Message']);
        return res.status(400).send(error.response.data);
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