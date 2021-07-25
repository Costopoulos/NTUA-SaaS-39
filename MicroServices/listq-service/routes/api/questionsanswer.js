const express = require("express");
const router = express.Router();
const pool = require("../../database")

router.get("/:id", async (req,res) => {
    try {
        const question_id = req.params.id;

        const question = await pool.query(
            "SELECT * FROM questions WHERE question_id = $1;",
            [question_id]
        );

        // const answers = await pool.query(
        //     "SELECT answer_id, answers.user_id, answered_on, question_id, answer_text, soauser.email FROM answers INNER JOIN soauser ON answers.user_id = soauser.user_id WHERE question_id = $1 ORDER BY answer_id;",
        //     [question_id]
        // );

        const answers = await pool.query(
            "SELECT * FROM answers WHERE question_id = $1;",
            [question_id]
        );

        console.log(question);
        console.log(answers);

        // console.log(answers.rows)

        return res.json(question, answers);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
    
});

router.post("/:id", async (req, res) => {
    try {

        const {user_id, user_email, answertext} = req.body;

        // console.log(answertext)

        const questionid = req.params.id;

        // const user_id = req.session.user.id;

        var newanswer = await pool.query(
            "INSERT INTO answers(user_id, user_email, question_id, answer_text) VALUES ($1,$2,$3,$4);",
            [user_id, user_email, questionid, answertext]
        )

        return res.json({Message: "Answer Successfully Submitted"});

    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;