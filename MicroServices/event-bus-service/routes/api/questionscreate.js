const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {user_id, title, text, keywords} = req.body;
    
        axios.post("http://localhost:5000/createquestion",{
            user_id: user_id,
            title: title,
            text: text,
            keywords: keywords
        })
        .then((response)=>{
          console.log(response);
          return res.json({Message: "Question successfully created"})
    
        }, (error) => {
          // console.log(error.response.data['Message']);
          return res.status(400).send(error.response.data);
        });
    
      } catch (err) {
        //res.status(401).json({ Message: "User with that mail does not exist" });
        console.error(err.message);
        res.status(500).send("Server Error");
      }
});

module.exports = router;