const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
require('dotenv').config();

router.get("/:id", async (req,res) => {

    if (!req.session.isLoggedIn){
        return res.redirect("/signin");
    }

    const question_id = req.params.id;

    const question = await pool.query(
        "SELECT * FROM questions WHERE question_id = $1;",
        [question_id]
    );

    // console.log(question.rows[0])

    // const answers = await pool.query(
    //     "SELECT * FROM answers WHERE question_id = $1;",
    //     [question_id]
    // );

    const answers = await pool.query(
        "SELECT answer_id, answers.user_id, to_char(answered_on, 'HH24:MI') as answered_on, question_id, answer_text, soauser.email FROM answers INNER JOIN soauser ON answers.user_id = soauser.user_id WHERE question_id = $1 ORDER BY answer_id;",
        [question_id]
    );

    // console.log(answers.rows)

    return res.render("questionsanswer.ejs", {qid: question_id, question: question.rows[0], answers: answers.rows, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
});

router.post("/:id", async (req, res) => {
    try {
        const answertext = req.body.text;

        // console.log(answertext)

        const questionid = req.params.id;

        const user_id = req.session.user.id;

        var newanswer = await pool.query(
            "INSERT INTO answers(user_id, question_id, answer_text) VALUES ($1,$2,$3);",
            [user_id, questionid, answertext]
        )

        req.flash("successMessage", "Answer successfully submitted");
        return res.redirect(`/answerquestion/${questionid}`);
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;