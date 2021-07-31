const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
require('dotenv').config();

router.get("/", async (req,res) => {

    if (!req.session.isLoggedIn){
        return res.redirect("/signin");
    }


    const allquestions = await pool.query(
        "SELECT question_id, questions.user_id, to_char(asken_on, 'HH24:MI') as asken_on, title, question_text, keywords, soauser.email FROM questions INNER JOIN soauser ON questions.user_id = soauser.user_id ;"
    );

    // const allquestions = "SELECT * FROM questions;";
    

    console.log(allquestions);

    // console.log(allquestions.rows);

    // const sela = ['sela0', 'sela9']

    return res.render("questionslist.ejs", {questions: allquestions.rows, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
});


module.exports = router;