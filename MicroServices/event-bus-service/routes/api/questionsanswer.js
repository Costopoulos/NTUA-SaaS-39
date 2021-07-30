const express = require("express");
const router = express.Router();
const axios = require('axios')

router.get("/:id", async (req, res) => {
    try {
      // const {user_id, user_email, answertext} = req.body;

      const question_id = req.params.id;
    
        axios.get(`http://localhost:4997/answerquestion/${question_id}`)
        .then((response)=>{
          // console.log(response);
          return res.json(response.data)
    
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