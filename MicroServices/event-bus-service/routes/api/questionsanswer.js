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
          return res.json({answers: response.data})
    
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

router.post("/:id", async (req, res) => {
  try {
    const {user_id, user_email, answertext} = req.body;

    const question_id = req.params.id;
  
      const promise1 = axios.post(`http://localhost:4997/answerquestion/${question_id}`, {
        user_id: user_id,
        user_email: user_email,
        answertext: answertext
      })
      // .then((response)=>{
      //   // console.log(response);
      //   return res.json(response.data)
  
      // }, (error) => {
      //   // console.log(error.response.data['Message']);
      //   return res.status(400).send(error.response.data);
      // });
      const promise2 = axios.post(`http://localhost:4995/answerquestion/`, {
        user_id: user_id
      })
      await Promise.all([promise1, promise2])
          .then((response => {
            // console.log(response);
            res.json({Message: "Question successfully created"})
          }), (error) => {
            console.log(error);
            return res.status(400).send(error.response.data);
          })
  
  } catch (err) {
    //res.status(401).json({ Message: "User with that mail does not exist" });
    console.error(err.message);
    res.status(500).send("Event Error");
  }
});

module.exports = router;