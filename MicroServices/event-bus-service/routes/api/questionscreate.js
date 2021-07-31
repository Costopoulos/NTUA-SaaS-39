const express = require("express");
const router = express.Router();
const axios = require('axios')

router.post("/", async (req, res) => {
    try {
        const {user_id, user_email, title, text, keywords} = req.body;
    
        const promise1 = axios.post("https://mss-createq-service-saas39.herokuapp.com/createquestion",{
            user_id: user_id,
            user_email: user_email,
            title: title,
            text: text,
            keywords: keywords
        })

        const promise2 = axios.post("https://mss-listq-service-saas39.herokuapp.com/createquestion",{
            user_id: user_id,
            user_email: user_email,
            title: title,
            text: text,
            keywords: keywords
          })

          const promise3 = axios.post("https://mss-stats-service-saas39.herokuapp.com/createquestion",{
            keywords: keywords
          })

          const promise4 = axios.post("https://mss-dashboard-service-saas39.herokuapp.com/createquestion",{
            user_id: user_id
          })

          await Promise.all([promise1, promise2, promise3, promise4])
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