const express = require("express");
const router = express.Router();
const axios = require('axios')

router.post("/", async (req, res) => {
    try {
        const {user_id, user_email, title, text, keywords} = req.body;
    
        axios.post("http://localhost:4999/createquestion",{
            user_id: user_id,
            user_email: user_email,
            title: title,
            text: text,
            keywords: keywords
        })
        .then((response)=>{
          // console.log(response);
          axios.post("http://localhost:4998/createquestion",{
            user_id: user_id,
            user_email: user_email,
            title: title,
            text: text,
            keywords: keywords
          })
          .then((response => {
            // console.log(response);
            res.json({Message: "Question successfully created at listq service"})
          }), (error) => {
            res.status(400).send(error.response.data);
          })
          return res.json({Message: "Question successfully created"})
    
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