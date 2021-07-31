const express = require("express");
const router = express.Router();
const axios = require('axios')

router.get("/", async (req,res) => {

    try {
        axios.get("https://mss-listq-service-saas39.herokuapp.com/listquestions")
        .then((response)=>{
          // console.log(response);
          return res.json({allquestions: response.data})
    
        }, (error) => {
          // console.log(error.response.data['Message']);
          return res.status(400).send(error.response.data);
        });
    
    } catch (err) {
      //res.status(401).json({ Message: "User with that mail does not exist" });
      console.error(err.message);
      res.status(500).send("Event Error");
    }
    
});


module.exports = router;