const express = require("express");
const router = express.Router();
const pool = require("../../database");


router.get("/", async (req,res) => {

    const user_id = req.body; //header probably

    const myquestions = await pool.query(
        "SELECT COUNT(*) FROM questions WHERE user_id = $1",
        [user_id]
    )

    const myanswers = await pool.query(
        "SELECT COUNT(*) FROM answers WHERE user_id = $1",
        [user_id]
    )

    const myquestionstoday = await pool.query(
        "SELECT COUNT(*) FROM questions WHERE user_id = $1 AND asken_on >= NOW() - interval '24 hours'",
        [user_id]
    )

    const myanswerstoday = await pool.query(
        "SELECT COUNT(*) FROM answers WHERE user_id = $1 AND answered_on >= NOW() - interval '24 hours'",
        [user_id]
    )

    return res.json({questionscount: myquestions.rows[0].count, answerscount: myanswers.rows[0].count, questionscounttoday: myquestionstoday.rows[0].count, answerscounttoday: myanswerstoday.rows[0].count})
});

module.exports = router;