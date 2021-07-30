const express = require("express");
const router = express.Router();
const axios = require('axios')
require('dotenv').config();

router.post("/", async (req, res) => {
  // try {

    const {email, password1, password2} = req.body;

    axios.post("http://localhost:5000/signup",{
      email: email,
      password1: password1,
      password2: password2
    })
    .then((response)=>{
      // console.log(response);
      return res.json({Message: "Successful Signup"})

    }, (error) => {
        return res.status(400).send(error.response.data);
    });

    


  // } catch (err) {
  //   res.status(400).json({ Message: "User with this swta already exists" });
  // }
});

module.exports = router;

