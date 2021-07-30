const express = require("express");
const router = express.Router();
const axios = require('axios')
// const pool = require("../../database");
// const authorization = require("../../middleware/authorization");
// require('dotenv').config();

router.get("/", async (req,res) => {

    if (!req.session.isLoggedIn){
        return res.redirect("/signin");
    }


    // const allquestions = await pool.query(
    //     "SELECT question_id, questions.user_id, asken_on, title, question_text, keywords, soauser.email FROM questions INNER JOIN soauser ON questions.user_id = soauser.user_id ;"
    // );
    try {
        axios.get("http://localhost:7000/listquestions")
        .then((response)=>{
        //   console.log(response);
        // console.log(response.data.allquestions);
        return res.render("questionslist.ejs", {questions: response.data.allquestions, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
    
        }, (error) => {
          // console.log(error.response.data['Message']);
          return res.status(400).send(error.response.data);
        });
    
    } catch (err) {
      //res.status(401).json({ Message: "User with that mail does not exist" });
      console.error(err.message);
      res.status(500).send("Client Error");
    }
    
});


module.exports = router;